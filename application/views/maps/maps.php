<!DOCTYPE html>
<html>
<head>
	<title>Pantau Banjir</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url('/bower_components/bootstrap/dist/css/bootstrap.css') ?>">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/L.Control.Locate.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/leaflet.extra-markers.css" />
    <link href="<?php echo base_url(); ?>assets/css/leaflet.css" rel="stylesheet">
    <script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>

    <script src="<?php echo base_url(); ?>assets/js/leaflet.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/google-leaf.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/Control.FullScreen.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/L.Control.Locate.js" ></script>
    <script src="<?php echo base_url(); ?>assets/js/leaflet-routing-machine.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/leaflet.extra-markers.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/leaflet-image.js"></script>
</head>
<body>
	<div class="container-fluid" style="height: 100vh;" id="map">
		<div class="row">
			<div class="col-md-3 info">
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="laporan_qlue"> Laporan Banjir QLUE
				    </label>
				</div>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="laporan_petajakarta"> Laporan Peta Jakarta
				    </label>
				</div>
			</div>
		</div>
	</div>
    <script src="<?php echo base_url('/bower_components/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('/bower_components/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>
	<script type="text/javascript">
		/**
		 * 
		 *  Variables Initialization
		 * 
		 */
		var root = "<?php echo base_url(); ?>";
		var kelurahan_layer = null;
		var petajakarta_layer = null;

		/**
		 * 
		 *  Layer Styling
		 * 
		 */
		var sembunyi = {
		  color : "transparent",
		  weight : 1,
		  opacity : 0,
		  fillOpacity : 0
		};
		
		var style_kelurahan = {
		  color : "#000", 
		  weight : 1, 
		  opacity : 1, 
		  fillOpacity  : 0,
		  dashArray : 3
		};

		var style_kelurahan_gelap = {
		  color : "#000", 
		  weight : 1, 
		  opacity : 1, 
		  fillOpacity  : 0,
		  dashArray : 3
		};

		var popupOptions = {
		  maxWidth : '820',
		  minWidth : '250',
		  className : 'custom',
		  closeOnClick : true
		};

		/**
		 * 
		 *  Function Declaration
		 * 
		 */
		function getLineColor(d) {
		    return d > 0  ? '#333333' :
		                      'transparent';
		}

		function getColor(d) {
		    return d > 100  ? '#045a8d' :
		           d > 70   ? '#2b8cbe' :
		           d > 30   ? '#74a9cf' :
		           d > 10   ? '#bdc9e1' :
		                      '#ffffff';
		}

		function getOpacity(d) {
		    return d > 100  ? '0.6' :
		           d > 70   ? '0.6' :
		           d > 30   ? '0.6' :
		           d > 10   ? '0.6' :
		                      '0';
		}

		function getPetaJakartaColor(d) {
		    return d > 3  ? '#CC2A41' :
		           d > 2   ? '#FF8300' :
		           d > 1   ? '#FFFF00' :
		           d > 0   ? '#A0A9F7' :
		                      '#ffffff';
		}

		function getPetaJakartaOpacity(d) {
		    return d > 3  ? '0.6' :
		           d > 2   ? '0.6' :
		           d > 1   ? '0.6' :
		           d > 0   ? '0.6' :
		                      '0';
		}

		function style_flood(feature) {
		    return {
		        fillColor: getColor(feature.properties.flood_average),
		        weight: 1,
		        opacity: 1,
		        color: getLineColor(feature.properties.flood_average),
		        fillOpacity: getOpacity(feature.properties.flood_average)
		    };
		}

		function style_petajakarta_flood(feature) {
		    return {
		        fillColor: getPetaJakartaColor(feature.properties.state),
		        weight: 1,
		        opacity: 1,
		        color: getLineColor(feature.properties.flood_average),
		        fillOpacity: getPetaJakartaOpacity(feature.properties.state)
		    };
		}

		/*
		Set Kelurahan Layer
		 */
		function set_kelurahan_layer() {
		  	if ( kelurahan_layer != undefined ){
		    	map.removeLayer( kelurahan_layer );
		  	}

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : root + "index.php/geo/qlue",
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_tematik').show();
		    	},
		    	success: function (data) {
		      		kelurahan_layer = L.geoJson(data, {
		        		style: style_flood,
		        		onEachFeature: function (feature, layer) {
		        			if ( feature.properties.flood_average > 0 ) {

		        				var banjir = '';
			        			if (feature.properties.banjir.length != 0) {
			        				$.each(feature.properties.banjir, function () {
			        				  	banjir += '<i class="fa fa-caret-right"></i> '+ this.tinggi_genangan +' cm ( '+ this.date +' '+ this.time +' )<br>';
			        				})
			        			}

			        			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">Kelurahan</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_kelurahan + '</td></tr>' +
									'<tr><td valign="top" width="90">Average Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_average + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">Max Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_max + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">Laporan</td><td width="10" valign="top"> : </td><td>' + banjir + '</td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptions);
		        				
		        			}
		          			// Get bounds of polygon
		          			var bounds = layer.getBounds();
		          			// Get center of bounds
		          			var center = bounds.getCenter();
		          			// Use center to put marker on map
		          			//var marker = L.marker(center).addTo(map);
		        		}
		      		});
		      		kelurahan_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_tematik').hide();
				      	// $('#loading_tematik').show();
				      	// alert('Peta Tematik Telah Dirubah. Silahkan Pilih Menu Tematik.');
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		alert('Terjadi Kesalahan. Silahkan Periksa Koneksi Internet Anda.');
		    	}
		  	});
		}

		/*
		Set PetaJakarta Layer
		 */
		function set_petajakarta_layer() {
		  	if ( petajakarta_layer != undefined ){
		    	map.removeLayer( petajakarta_layer );
		  	}

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : "https://rem.petajakarta.org/banjir/data/api/v2/rem/flooded",
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_tematik').show();
		    	},
		    	success: function (data) {
		      		petajakarta_layer = L.geoJson(data, {
		        		style: style_petajakarta_flood,
		        		onEachFeature: function (feature, layer) {
		        			if (feature.properties.state > 0) {
		        				layer.bindPopup(feature.properties.level_name+ ', Kelurahan ' +feature.properties.parent_name, popupOptions);
		        			}
		          			// Get bounds of polygon
		          			var bounds = layer.getBounds();
		          			// Get center of bounds
		          			var center = bounds.getCenter();
		          			// Use center to put marker on map
		          			//var marker = L.marker(center).addTo(map);
		        		}
		      		});
		      		petajakarta_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_tematik').hide();
				      	// $('#loading_tematik').show();
				      	// alert('Peta Tematik Telah Dirubah. Silahkan Pilih Menu Tematik.');
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		alert('Terjadi Kesalahan. Silahkan Periksa Koneksi Internet Anda.');
		    	}
		  	});
		}

		var map = L.map('map', {
		    center: [-6.208763, 106.844912],
     		zoomControl:false,
		    zoom: 12,
		    minZoom:7,
		    maxZoom:17
		});

		var google_roadmap    = new L.Google('ROADMAP');
		var google_hybrid     = new L.Google('HYBRID');
		var google_satelit    = new L.Google('SATELLITE');
		var osm               = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {});
		var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
		var mapbox            = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
		                          maxZoom: 18,
		                          id: 'mapbox.streets'
		                        });

		map.addLayer(google_roadmap);

		// set_petajakarta_layer();
		// set_kelurahan_layer();

		var baseLayers = {
		  "Google Roadmap": google_roadmap,
		  "Google Hybrid": google_hybrid,
		  "Google Satellite": google_satelit,
		  "Open Street Map": osm,
		  "ESRI World Imagery": Esri_WorldImagery,
		  "Mapbox Street": mapbox
		};
		
		var overlays = {};
		
		L.control.layers(baseLayers, overlays,{
		  position : 'topright'
		}).addTo(map);

		new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
		
		var legend = L.control({position: 'bottomleft'});

		legend.onAdd = function (map) {
		  var div = L.DomUtil.create('div', 'info-legend'),
		  warna_total = ['#ffffff' , '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'];
		  labels = ['0 - 10 cm', '10 - 30 cm', '30 - 70 cm', '70 - 100 cm', '> 100 cm'];
		  // loop through our density intervals and generate a label with a colored square for each interval
		  for (var i = 0; i < warna_total.length; i++) {
		    div.innerHTML += '<i style="background:' + warna_total[i] + '"></i> ' + labels[i] + '<br>';
		  }
		  return div;
		};

		legend.addTo(map);

		map.on('baselayerchange', function(e) {
		  console.log(e.name);

		  kelurahan_layer.eachLayer(function (layer) {
		    console.log(layer);
		  });
		});
		
		$('#laporan_qlue').change(function () {
		    check = $("#laporan_qlue").prop("checked");
		    // checked
		    if( check ) {
		        set_kelurahan_layer();
		    } 
		    // unchecked
		    else {
		        if (kelurahan_layer != undefined) {
		            map.removeLayer(kelurahan_layer);
		        };
		    }
		})

		$('#laporan_petajakarta').change(function () {
		    check = $("#laporan_petajakarta").prop("checked");
		    // checked
		    if( check ) {
		        set_petajakarta_layer();
		    } 
		    // unchecked
		    else {
		        if (petajakarta_layer != undefined) {
		            map.removeLayer(petajakarta_layer);
		        };
		    }
		})
	</script>
</body>
</html>