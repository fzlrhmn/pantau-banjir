<!DOCTYPE html>
<html>
<head>
	<title>Pantau Banjir</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url('/bower_components/bootstrap/dist/css/bootstrap.css') ?>">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/L.Control.Locate.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/leaflet.extra-markers.css" />
    <link href="<?php echo base_url(); ?>assets/css/leaflet.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.css.map">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.standalone.css">
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
						<input type="checkbox" id="laporan_qlue"> Laporan Banjir QLUE &nbsp;<i class="fa fa-spinner fa-spin" id="loading_qlue"></i>
				    </label>
				</div>
				<div class="row">
					<div class="col-xs-10">
						<div class="input-daterange input-group" id="datepicker">
						    <input type="text" class="input-sm form-control" id="qlue_date_start" />
						    <span class="input-group-addon">to</span>
						    <input type="text" class="input-sm form-control" id="qlue_date_end" />						    
						</div>
					</div>
					<div class="col-xs-1">
						<button class="btn btn-sm btn-success" id="refresh_qlue"><i class="fa fa-refresh" ></i></button>
					</div>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="laporan_bpbd"> Laporan Banjir BPBD &nbsp;<i class="fa fa-spinner fa-spin" id="loading_bpbd"></i>
				    </label>
				</div>
				<div class="row">
					<div class="col-xs-10">
						<div class="input-daterange input-group" id="datepicker">
						    <input type="text" class="input-sm form-control" id="bpbd_date_start" />
						    <span class="input-group-addon">to</span>
						    <input type="text" class="input-sm form-control" id="bpbd_date_end" />						    
						</div>
					</div>
					<div class="col-xs-1">
						<button class="btn btn-sm btn-success" id="refresh_bpbd"><i class="fa fa-refresh" ></i></button>
					</div>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="laporan_petajakarta"> Laporan Banjir PetaJakarta &nbsp;<i class="fa fa-spinner fa-spin" id="loading_petajakarta"></i>
				    </label>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="petugas"> Petugas &nbsp;<i class="fa fa-spinner fa-spin" id="loading_petugas"></i>
				    </label>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="cctv_balitower"> CCTV balitower &nbsp;<i class="fa fa-spinner fa-spin" id="loading_balitower"></i>
				    </label>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="report_petajakarta"> Report Qlue Petajakarta &nbsp;<i class="fa fa-spinner fa-spin" id="loading_report_petajakarta"></i>
				    </label>
				</div>
				<hr>
				<div class="checkbox">
				    <label>
						<input type="checkbox" id="pintu_air"> Pintu Air &nbsp;<i class="fa fa-spinner fa-spin" id="loading_pintu_air"></i>
				    </label>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" tabindex="-1" role="dialog" id="modal">
	  	<div class="modal-dialog modal-lg">
	    	<div class="modal-content">
	      		<div class="modal-header">
	        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        		<h4 class="modal-title">Report</h4>
	      		</div>
		      	<div class="modal-body">
		        	<div class="row">
		        		<div class="col-md-12">
		        			<table class="table table-bordered">
		        				<thead>
		        					<tr>
		        						<th>Tanggal</th>
		        						<th>Laporan</th>
		        						<th>Source</th>
		        						<th>Action</th>
		        					</tr>
		        				</thead>
		        				<tbody id="report_tbody">
		        					
		        				</tbody>
		        			</table>
		        		</div>
		        	</div>
		      	</div>
	    	</div><!-- /.modal-content -->
	  	</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<div class="modal fade" tabindex="-1" role="dialog" id="modal_pintu_air">
	  	<div class="modal-dialog modal-lg">
	    	<div class="modal-content">
	      		<div class="modal-header">
	        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	      		</div>
		      	<div class="modal-body">
		        	<div class="row">
		        		<div class="col-md-12" id="chart" style="height:500px">
		        			
		        		</div>
		        	</div>
		      	</div>
	    	</div><!-- /.modal-content -->
	  	</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

    <script src="<?php echo base_url('/bower_components/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('/bower_components/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="http://www.amcharts.com/lib/3/amcharts.js"></script>
	<script type="text/javascript" src="http://www.amcharts.com/lib/3/serial.js"></script>
	<script type="text/javascript">
		var d = new Date();

		var currDate = d.getDate();
		var currMonth = d.getMonth()+1;
		var currYear = d.getFullYear();

		if (currMonth < 10) {
			currMonth = '0' + currMonth;
		}

		var dateStr = currYear + "-" + currMonth + "-" + currDate;

		$('.input-daterange').datepicker({
		    format: "yyyy-mm-dd",
		    autoclose : true
		});

		$('#qlue_date_start').val(dateStr);
		$('#qlue_date_end').val(dateStr);

		$('#bpbd_date_start').val(dateStr);
		$('#bpbd_date_end').val(dateStr);

		$('#refresh_qlue').hide();
		$('#refresh_bpbd').hide();

		$('#loading_qlue').hide();
		$('#loading_qlue').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_petajakarta').hide();
		$('#loading_petajakarta').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_bpbd').hide();
		$('#loading_bpbd').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_petugas').hide();
		$('#loading_petugas').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_balitower').hide();
		$('#loading_balitower').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_report_petajakarta').hide();
		$('#loading_report_petajakarta').ajaxStop(function () {
		  $(this).show();
		})

		$('#loading_pintu_air').hide();
		$('#loading_pintu_air').ajaxStop(function () {
		  $(this).show();
		})
		
		/**
		 * 
		 *  Variables Initialization
		 * 
		 */
		var root = "<?php echo base_url(); ?>";
		var qlue_layer = null;
		var petajakarta_layer = null;
		var bpbd_layer = null;
		var petugas_layer = null;
		var balitower_cctv_layer = null;
		var report_petajakarta_layer = null;
		var pintu_air_layer = null;

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
		  maxWidth : '520',
		  minWidth : '250',
		  className : 'custom',
		  closeOnClick : true
		};

		var popupOptionsReport = {
		  maxWidth : '320',
		  minWidth : '150',
		  className : 'custom',
		  closeOnClick : true
		};

		var petugasIcon = L.ExtraMarkers.icon({
		    icon: 'fa-user', 
		    markerColor: 'green', 
		    prefix: 'fa',
		    iconColor: 'white',
		    shape: 'square'
		});

		var petugasEselonIcon = L.ExtraMarkers.icon({
		    icon: 'fa-user-secret', 
		    markerColor: 'red', 
		    prefix: 'fa',
		    iconColor: 'white',
		    shape: 'circle'
		});

		var cctvBalitowerIcon = L.ExtraMarkers.icon({
		    icon: 'fa-video-camera', 
		    markerColor: 'orange', 
		    prefix: 'fa',
		    iconColor: 'white',
		    shape: 'square'
		});

		var reportPetajakartaIcon = L.ExtraMarkers.icon({
		    icon: 'fa-comment', 
		    markerColor: 'pink', 
		    prefix: 'fa',
		    iconColor: 'white',
		    shape: 'circle'
		});

		var pintuAirIcon = L.ExtraMarkers.icon({
		    icon: 'fa-building-o', 
		    markerColor: 'cyan', 
		    prefix: 'fa',
		    iconColor: 'white',
		    shape: 'square'
		});

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
		    return d >= 150  ? '#CC2A41' :
		           d >= 70   ? '#FF8300' :
		           d >= 10   ? '#FFFF00' :
		           d < 10   ? '#A0A9F7' :
		                      '#ffffff';
		}

		function getOpacity(d) {
		    return d > 100  ? '0.8' :
		           d > 70   ? '0.8' :
		           d > 30   ? '0.8' :
		           d > 10   ? '0.8' :
		                      '0.8';
		}

		function getPetaJakartaColor(d) {
			var color = null;

			if( d == 1 ){
				color = '#A0A9F7';
			}
			else if( d == 2 ){
				color = '#FFFF00';
			}

			else if( d == 3 ){
				color = '#FF8300';
			}

			else if ( d == 4 ){
				color = '#CC2A41';
			}
			else if ( d == 0) {
				color = 'transparent';
			}
			
			return color;
		}

		function getPetaJakartaOpacity(d) {
		    return d > 3  ? '0.8' :
		           d > 2   ? '0.8' :
		           d > 1   ? '0.8' :
		           d > 0   ? '0.8' :
		                      '0';
		}

		function style_flood(feature) {
		    return {
		        fillColor: getPetaJakartaColor(feature.properties.state),
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
		        color: getLineColor(feature.properties.state),
		        fillOpacity: getPetaJakartaOpacity(feature.properties.state)
		    };
		}

		function getState(d) {
		    return d >= 4  ? '> 150 Cm' :
		           d >= 3   ? '71 - 150 Cm' :
		           d >= 2   ? '10 - 70 Cm' :
		           d >= 1   ? 'Use Caution' :
		                      'No Flooding';
		}

		function onEachFeature(feature, layer) {
		    layer.on({
		        click: modalDetail
		    });
		}

		function modalDetail(e) {
			var observations 		= e.target.feature.properties.observations;
			var last_observation 	= observations[observations.length-1];
			var warning_state 		= last_observation.warningnameid;
			console.log(warning_state);
			var chart_pintu_air = AmCharts.makeChart("chart",
							{
								"type": "serial",
								"categoryField": "measuredatetime",
								"dataDateFormat": "YYYY-MM-DD HH:NN",
								"categoryAxis": {
									"minPeriod": "mm",
									"parseDates": true
								},
								"chartCursor": {
									"enabled": true,
									"categoryBalloonDateFormat": "JJ:NN"
								},
								"chartScrollbar": {
									"enabled": false
								},
								"trendLines": [],
								"graphs": [
									{
										"bullet": "round",
										"id": "AmGraph-1",
										"title": e.target.feature.properties.gaugenameid,
										"valueField": "depth"
									}
								],
								"guides": [],
								"valueAxes": [
									{
										"id": "ValueAxis-1",
										"title": "Ketinggian Air"
									}
								],
								"allLabels": [],
								"balloon": {},
								"legend": {
									"enabled": true,
									"useGraphSettings": true
								},
								"titles": [
									{
										"id": "Title-1",
										"size": 15,
										"text": "Timeline Tinggi Pintu Air"
									}
								],
								"dataProvider": e.target.feature.properties.observations
							}
						);
			$('#modal_pintu_air').modal('show');
		}

		function get_report_modal() {
			$('#modal').modal('show');
		}

		function tambah_titik(x, y, pkey){

		  map.panTo(new L.LatLng(x, y));
		  map.setZoom(16);

		  report_petajakarta_layer.eachLayer(function (layer) {
		  	layer.closePopup();
		    if ( layer.feature.properties.pkey == pkey ) {
		      layer.openPopup();
		    };
		  });
		  $('#modal').modal('hide');
		}

		function get_report_petajakarta_layer() {
			$('#report_tbody').empty();
			if ( report_petajakarta_layer != undefined ){
		    	map.removeLayer( report_petajakarta_layer );
		  	}

		  	if ( qlue_layer != undefined ){
		    	qlue_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	if ( bpbd_layer != undefined ){
		    	bpbd_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	$('#report_petajakarta').prop('checked', true);

			var url = 'https://petajakarta.org/banjir/data/api/v2/reports/confirmed';
			
			$.ajax({
			  	type : "GET",
			  	async : true,
			  	global : false,
			  	url : url,
			  	dataType : 'json',
			  	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_report_petajakarta').show();
		    	},
			  	success : function (data) {
			    	source = data;
			    	report_petajakarta_layer = L.geoJson(data, {
			      		pointToLayer: function(feature, latlng) {
			      			return L.marker(latlng, {
									icon: reportPetajakartaIcon
								})
			      			
			      		},
			      		onEachFeature: function (feature, layer) {
			      			$('#report_tbody').append('<tr><td>'+feature.properties.created_at+'</td><td>'+feature.properties.text+'</td><td>'+feature.properties.source+'</td><td><button class="btn btn-info btn-md" onclick="tambah_titik('+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]+','+feature.properties.pkey+')">Ke Lokasi</button></td></tr>');
			     			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<table class="custom-table">' +
									'<tr><td valign="top" colspan="3"><center><h4>' + feature.properties.title + '</h4></center></td></tr>' +
									'<tr><td valign="top" colspan="3"><center><img width="250" src="' + feature.properties.image_url + '"></img></center></td></tr>' +
									'<tr><td valign="top" width="90">Aduan</td><td width="10" valign="top"> : </td><td>' + feature.properties.text + '</td></tr>' +
									'<tr><td valign="top" width="90">Tanggal</td><td width="10" valign="top"> : </td><td>' + feature.properties.created_at + '</td></tr>' +
									// '<tr><td valign="top" width="90">Petugas</td><td width="10" valign="top"> : </td><td><button class="btn btn-sm btn-success" onclick="get_petugas(' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + ')">Cari Petugas</button></td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptionsReport);
			      		}
			    	});
			    	report_petajakarta_layer.addTo(map);
			  	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_report_petajakarta').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		$('#loading_report_petajakarta').hide();
		    	}
			});
		}

		function get_petugas(x,y) {
			if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		  	}

		  	if ( qlue_layer != undefined ){
		    	qlue_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	if ( bpbd_layer != undefined ){
		    	bpbd_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	$('#petugas').prop('checked', true);

			var url = root + 'index.php/petugas/terdekat?lat=' + y + '&long=' + x;
			
			$.ajax({
			  	type : "GET",
			  	async : true,
			  	global : false,
			  	url : url,
			  	dataType : 'json',
			  	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_petugas').show();
		    	},
			  	success : function (data) {
			    	source = data;
			    	petugas_layer = L.geoJson(data, {
			      		pointToLayer: function(feature, latlng) {
			      			if (feature.properties.jabatan == 'Lurah') {
			      				return L.marker(latlng, {
									icon: petugasEselonIcon
								})
			      			}else{
			      				return L.marker(latlng, {
									icon: petugasIcon
								})
			      			}
			      			
			      		},
			      		onEachFeature: function (feature, layer) {
			     			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>Detail Petugas</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">Nama Petugas</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama + '</td></tr>' +
									'<tr><td valign="top" width="90">Jabatan</td><td width="10" valign="top"> : </td><td>' + feature.properties.jabatan + '</td></tr>' +
									'<tr><td valign="top" width="90">Dinas</td><td width="10" valign="top"> : </td><td>' + feature.properties.dinas + '</td></tr>' +
									'<tr><td valign="top" width="90">Telepon</td><td width="10" valign="top"> : </td><td>' + feature.properties.phone + '</td></tr>' +
									'<tr><td valign="top" width="90">Email</td><td width="10" valign="top"> : </td><td>' + feature.properties.email + '</td></tr>' +
									'<tr><td valign="top" width="90">Login Terakhir</td><td width="10" valign="top"> : </td><td>' + feature.properties.login_terakhir + '</td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptions);
			      		}
			    	});
			    	petugas_layer.addTo(map);
			  	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_petugas').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		$('#loading_petugas').hide();
		    	}
			});
		}

		function get_petugas_all() {
			if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		  	}

		  	if ( qlue_layer != undefined ){
		    	qlue_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	if ( bpbd_layer != undefined ){
		    	bpbd_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	$('#petugas').prop('checked', true);

			var url = root + 'index.php/petugas/';
			
			$.ajax({
			  	type : "GET",
			  	async : true,
			  	global : false,
			  	url : url,
			  	dataType : 'json',
			  	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_petugas').show();
		    	},
			  	success : function (data) {
			    	source = data;
			    	petugas_layer = L.geoJson(data, {
			      		pointToLayer: function(feature, latlng) {
			      			if (feature.properties.jabatan == 'Lurah') {
			      				return L.marker(latlng, {
									icon: petugasEselonIcon
								})
			      			}else{
			      				return L.marker(latlng, {
									icon: petugasIcon
								})
			      			}
			      			
			      		},
			      		onEachFeature: function (feature, layer) {
			     			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>Detail Petugas</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">Nama Petugas</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama + '</td></tr>' +
									'<tr><td valign="top" width="90">Jabatan</td><td width="10" valign="top"> : </td><td>' + feature.properties.jabatan + '</td></tr>' +
									'<tr><td valign="top" width="90">Dinas</td><td width="10" valign="top"> : </td><td>' + feature.properties.dinas + '</td></tr>' +
									'<tr><td valign="top" width="90">Telepon</td><td width="10" valign="top"> : </td><td>' + feature.properties.phone + '</td></tr>' +
									'<tr><td valign="top" width="90">Email</td><td width="10" valign="top"> : </td><td>' + feature.properties.email + '</td></tr>' +
									'<tr><td valign="top" width="90">Login Terakhir</td><td width="10" valign="top"> : </td><td>' + feature.properties.login_terakhir + '</td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptions);
			      		}
			    	});
			    	petugas_layer.addTo(map);
			  	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_petugas').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		$('#loading_petugas').hide();
		    	}
			});
		}

		function get_balitower_cctv(x,y) {
			if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		  	}

		  	if ( qlue_layer != undefined ){
		    	qlue_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	if ( bpbd_layer != undefined ){
		    	bpbd_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	$('#cctv_balitower').prop('checked', true);

			var url = root + 'index.php/cctv/balitower_terdekat?lat=' + y + '&long=' + x;
			
			$.ajax({
			  	type : "GET",
			  	async : true,
			  	global : false,
			  	url : url,
			  	dataType : 'json',
			  	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_balitower').show();
		    	},
			  	success : function (data) {
			    	source = data;
			    	balitower_cctv_layer = L.geoJson(data, {
			      		pointToLayer: function(feature, latlng) {
			      			return L.marker(latlng, {
								icon: cctvBalitowerIcon
							})
			      		},
			      		onEachFeature: function (feature, layer) {
			     			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>CCTV ' + feature.properties.location + '</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" colspan="3"><center><iframe src="' + feature.properties.url + '?dvr=false&proto=hls"></iframe></center></td></tr>' +
									'<tr><td valign="top" width="90">Site Name</td><td width="10" valign="top"> : </td><td>' + feature.properties.site_name + '</td></tr>' +
									'<tr><td valign="top" width="90">Target View</td><td width="10" valign="top"> : </td><td>' + feature.properties.target_view + '</td></tr>' +
									'<tr><td valign="top" width="90">Location</td><td width="10" valign="top"> : </td><td>' + feature.properties.location + '</td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptions);
			      		}
			    	});
			    	balitower_cctv_layer.addTo(map);
			  	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_balitower').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		$('#loading_balitower').hide();
		    	}
			});
		}

		/*
		Get balitower cctv all
		 */
		function get_balitower_cctv_all() {
			if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		  	}

		  	if ( qlue_layer != undefined ){
		    	qlue_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	if ( bpbd_layer != undefined ){
		    	bpbd_layer.eachLayer(function(layer) {
		    		layer.closePopup();
		    	})
		  	}

		  	$('#cctv_balitower').prop('checked', true);

			var url = root + 'index.php/cctv/balitower';
			
			$.ajax({
			  	type : "GET",
			  	async : true,
			  	global : false,
			  	url : url,
			  	dataType : 'json',
			  	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_balitower').show();
		    	},
			  	success : function (data) {
			    	source = data;
			    	balitower_cctv_layer = L.geoJson(data, {
			      		pointToLayer: function(feature, latlng) {
			      			return L.marker(latlng, {
								icon: cctvBalitowerIcon
							})
			      		},
			      		onEachFeature: function (feature, layer) {
			     			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>CCTV ' + feature.properties.location + '</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" colspan="3"><center><iframe src="' + feature.properties.url + '?dvr=false&proto=hls"></iframe></center></td></tr>' +
									'<tr><td valign="top" width="90">Site Name</td><td width="10" valign="top"> : </td><td>' + feature.properties.site_name + '</td></tr>' +
									'<tr><td valign="top" width="90">Target View</td><td width="10" valign="top"> : </td><td>' + feature.properties.target_view + '</td></tr>' +
									'<tr><td valign="top" width="90">Location</td><td width="10" valign="top"> : </td><td>' + feature.properties.location + '</td></tr>' +
									'</table>' +
									
			        			    '</div>' +
									'</br>' +
									'</div>';

			          			layer.bindPopup(popupContent, popupOptions);
			      		}
			    	});
			    	balitower_cctv_layer.addTo(map);
			  	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_balitower').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		      		$('#loading_balitower').hide();
		    	}
			});
		}

		/*
		Set Pintu Air Layer
		 */
		function set_pintu_air_layer() {
		  	if ( pintu_air_layer != undefined ){
		    	map.removeLayer( pintu_air_layer );
		  	}
		  	if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		    	$('#petugas').prop('checked', false);
		  	}
		  	if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		    	$('#cctv_balitower').prop('checked', false);
		  	}

		  	var url = "https://petajakarta.org/banjir/data/api/v2/infrastructure/floodgauges";

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : url,
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_pintu_air').show();
		    	},
		    	success: function (data) {
		      		pintu_air_layer = L.geoJson(data, {
		        		pointToLayer: function(feature, latlng) {
			      			return L.marker(latlng, {
								icon: pintuAirIcon
							})
			      		},
		        		onEachFeature: onEachFeature
		      		});
		      		pintu_air_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_pintu_air').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		    	}
		  	});
		}

		/*
		Set Qlue Layer
		 */
		function set_qlue_layer() {
		  	if ( qlue_layer != undefined ){
		    	map.removeLayer( qlue_layer );
		  	}
		  	if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		    	$('#petugas').prop('checked', false);
		  	}
		  	if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		    	$('#cctv_balitower').prop('checked', false);
		  	}

		  	var qlue_date_start 	= $('#qlue_date_start').val();
		  	var qlue_date_end 		= $('#qlue_date_end').val();

		  	if ( qlue_date_start != '' && qlue_date_end != '') {
		  		var url = root + '/index.php/geo/qlue?datestart=' + qlue_date_start + '&dateend=' + qlue_date_end;
		  	}
		  	else{
		  		var url = root + "index.php/geo/qlue";
		  	}

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : url,
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_qlue').show();
		    	},
		    	success: function (data) {
		      		qlue_layer = L.geoJson(data, {
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
									'<h4>Laporan Qlue</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">Kelurahan</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_kelurahan + '</td></tr>' +
									'<tr><td valign="top" width="90">Average Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_average + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">Max Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_max + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">State</td><td width="10" valign="top"> : </td><td>' + getState(feature.properties.state) + '</td></tr>' +
									'<tr><td valign="top" width="90">Petugas</td><td width="10" valign="top"> : </td><td><button class="btn btn-sm btn-success" onclick="get_petugas(' + feature.properties.x + ',' + feature.properties.y + ')">Cari Petugas</button></td></tr>' +
									'<tr><td valign="top" width="90">CCTV</td><td width="10" valign="top"> : </td><td><button class="btn btn-sm btn-success" onclick="get_balitower_cctv(' + feature.properties.x + ',' + feature.properties.y + ')">Cari CCTV Balitower</button></td></tr>' +
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
		      		qlue_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_qlue').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
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
		  	if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		  	}
		  	if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		  	}

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : root + 'index.php/geo/petajakarta',
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_petajakarta').show();
		    	},
		    	success: function (data) {
		    		console.log(data.QueryTime);
		    		var dateTime = data.QueryTime.split("T");
		    		var time 	= dateTime[1];
		    		var date 	= dateTime[0];
		      		petajakarta_layer = L.geoJson(data, {
		        		style: style_petajakarta_flood,
		        		onEachFeature: function (feature, layer) {
		        			if (feature.properties.state > 0) {
		        				var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>Laporan PetaJakarta</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">RW</td><td width="10" valign="top"> : </td><td>' + feature.properties.level_name + '</td></tr>' +
									'<tr><td valign="top" width="90">Kelurahan</td><td width="10" valign="top"> : </td><td>' + feature.properties.parent_name + '</td></tr>' +
									'<tr><td valign="top" width="90">State</td><td width="10" valign="top"> : </td><td>' + getState(feature.properties.state) + '</td></tr>' +
									'<tr><td valign="top" width="90">Tanggal</td><td width="10" valign="top"> : </td><td>' + date + ' ' + time + '</td></tr>' +
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
		      		petajakarta_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_petajakarta').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		    	}
		  	});
		}

		/*
		Set BPBD Layer
		 */
		function set_bpbd_layer() {
		  	if ( bpbd_layer != undefined ){
		    	map.removeLayer( bpbd_layer );
		  	}
		  	if ( petugas_layer != undefined ){
		    	map.removeLayer( petugas_layer );
		  	}
		  	if ( balitower_cctv_layer != undefined ){
		    	map.removeLayer( balitower_cctv_layer );
		  	}

		  	var bpbd_date_start 	= $('#bpbd_date_start').val();
		  	var bpbd_date_end 		= $('#bpbd_date_end').val();

		  	if ( bpbd_date_start != '' && bpbd_date_end != '') {
		  		var url = root + 'index.php/geo/bpbd?datestart=' + bpbd_date_start + '&dateend=' + bpbd_date_end;
		  	}
		  	else{
		  		var url = root + "index.php/geo/bpbd";
		  	}

		  	$.ajax({
		    	type : "GET",
		    	async : true,
		    	global : false,
		    	url : url,
		    	// dataType : 'json',
		    	beforeSend:function () {
		      		console.log('sending');
		      		$('#loading_bpbd').show();
		    	},
		    	success: function (data) {
		      		bpbd_layer = L.geoJson(data, {
		        		style: style_flood,
		        		onEachFeature: function (feature, layer) {
		        			if ( feature.properties.flood_average > 0 ) {

		        				var banjir = '';
			        			if (feature.properties.banjir.length != 0) {
			        				$.each(feature.properties.banjir, function () {
			        				  	banjir += '<i class="fa fa-caret-right"></i> '+ this.KETINGGIAN +' cm ( '+ this.TANGGAL_KEJADIAN +' )<br>';
			        				})
			        			}

			        			var popupContent = '<div class="row">' + 
									'<div class="col-sm-12">' + 
									'<h4>Laporan BPBD</h4>' +
									'<table class="custom-table">' +
									'<tr><td valign="top" width="90">Kota</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_kodya + '</td></tr>' +
									'<tr><td valign="top" width="90">Kecamatan</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_kecamatan + '</td></tr>' +
									'<tr><td valign="top" width="90">Kelurahan</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_kelurahan + '</td></tr>' +
									'<tr><td valign="top" width="90">RW</td><td width="10" valign="top"> : </td><td>' + feature.properties.rw + '</td></tr>' +
									'<tr><td valign="top" width="90">Average Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_average + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">Max Depth</td><td width="10" valign="top"> : </td><td>' + feature.properties.flood_max + ' cm</td></tr>' +
									'<tr><td valign="top" width="90">Petugas</td><td width="10" valign="top"> : </td><td><button class="btn btn-sm btn-success" onclick="get_petugas(' + feature.properties.x + ',' + feature.properties.y + ')">Cari Petugas</button></td></tr>' +
									'<tr><td valign="top" width="90">CCTV</td><td width="10" valign="top"> : </td><td><button class="btn btn-sm btn-success" onclick="get_balitower_cctv(' + feature.properties.x + ',' + feature.properties.y + ')">Cari CCTV Balitower</button></td></tr>' +
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
		      		bpbd_layer.addTo(map);
		    	},
		    	complete:function () {
		      		console.log('send complete');
		      		$('#loading_bpbd').hide();
		    	},
		    	error:function (xhr) {
		      		console.log(xhr.statusText + xhr.responseText);
		    	}
		  	});
		}

		var map = L.map('map', {
		    center: [-6.208763, 106.844912],
     		zoomControl:false,
		    zoom: 12,
		    minZoom:7,
		    maxZoom:19
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

		map.addLayer(osm);

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
		
		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {
		  var div = L.DomUtil.create('div', 'info-legend'),
		  warna_total = ['#ffffff' , '#A0A9F7', '#FFFF00', '#FF8300', '#CC2A41'];
		  labels = ['No Flood', 'Use Caution', '10 - 70 Cm', '70 - 150 cm', '> 150 cm'];
		  // loop through our density intervals and generate a label with a colored square for each interval
		  for (var i = 0; i < warna_total.length; i++) {
		    div.innerHTML += '<i style="background:' + warna_total[i] + '"></i> ' + labels[i] + '<br>';
		  }
		  return div;
		};

		legend.addTo(map);

		var button = L.control({position: 'topright'});

		button.onAdd = function (map) {
		  var div = L.DomUtil.create('div', 'button-legend');
		  div.innerHTML += '<button class="btn btn-md btn-default" onclick="get_report_modal()"><i class="fa fa-comment"></i></button>';
		  return div;
		};

		button.addTo(map);
		new L.Control.Zoom({ position: 'topright' }).addTo(map);

		map.on('baselayerchange', function(e) {
		  console.log(e.name);

		  qlue_layer.eachLayer(function (layer) {
		    console.log(layer);
		  });
		});
		
		$('#laporan_qlue').change(function () {
		    check = $("#laporan_qlue").prop("checked");
		    // checked
		    if( check ) {
		        set_qlue_layer();
		        $('#refresh_qlue').show();
		    } 
		    // unchecked
		    else {
		        if (qlue_layer != undefined) {
		            map.removeLayer(qlue_layer);
		        };
		        if ( petugas_layer != undefined ){
			    	map.removeLayer( petugas_layer );
			  	}
			  	if ( balitower_cctv_layer != undefined ){
			    	map.removeLayer( balitower_cctv_layer );
			  	}
		        $('#refresh_qlue').hide();
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

		$('#laporan_bpbd').change(function () {
		    check = $("#laporan_bpbd").prop("checked");
		    // checked
		    if( check ) {
		        set_bpbd_layer();
		        $('#refresh_bpbd').show();
		    } 
		    // unchecked
		    else {
		        if (bpbd_layer != undefined) {
		            map.removeLayer(bpbd_layer);
		        };
		        if ( petugas_layer != undefined ){
			    	map.removeLayer( petugas_layer );
			  	}

			  	if ( balitower_cctv_layer != undefined ){
			    	map.removeLayer( balitower_cctv_layer );
			  	}
		        $('#refresh_bpbd').hide();
		    }
		})

		$('#petugas').change(function () {
		    check = $("#petugas").prop("checked");
		    // checked
		    if( check ) {
		    	if ( petugas_layer != undefined ){
			    	map.removeLayer( petugas_layer );
			  	}
			  	get_petugas_all();
		    } 
		    // unchecked
		    else {
		        if ( petugas_layer != undefined ){
			    	map.removeLayer( petugas_layer );
			  	}
		    }
		})

		$('#cctv_balitower').change(function () {
		    check = $("#cctv_balitower").prop("checked");
		    // checked
		    if( check ) {
		    	if ( balitower_cctv_layer != undefined ){
			    	map.removeLayer( balitower_cctv_layer );
			  	}
		        get_balitower_cctv_all();
		    } 
		    // unchecked
		    else {
		        if ( balitower_cctv_layer != undefined ){
			    	map.removeLayer( balitower_cctv_layer );
			  	}
		    }
		})

		$('#report_petajakarta').change(function () {
		    check = $("#report_petajakarta").prop("checked");
		    // checked
		    if( check ) {
		    	if ( report_petajakarta_layer != undefined ){
			    	map.removeLayer( report_petajakarta_layer );
			  	}
			  	get_report_petajakarta_layer();
		    } 
		    // unchecked
		    else {
				$('#report_tbody').empty();
		        if ( report_petajakarta_layer != undefined ){
			    	map.removeLayer( report_petajakarta_layer );
			  	}
		    }
		})

		$('#pintu_air').change(function () {
		    check = $("#pintu_air").prop("checked");
		    // checked
		    if( check ) {
		    	if ( pintu_air_layer != undefined ){
			    	map.removeLayer( pintu_air_layer );
			  	}
		        set_pintu_air_layer();
		    } 
		    // unchecked
		    else {
		        if ( pintu_air_layer != undefined ){
			    	map.removeLayer( pintu_air_layer );
			  	}
		    }
		})

		$('#refresh_qlue').click(function(e) {
			e.preventDefault();
			set_qlue_layer();
		})

		$('#refresh_bpbd').click(function(e) {
			e.preventDefault();
			set_bpbd_layer();
		})
		$('#modal_pintu_air').on('shown.bs.modal', function (e) {
			chart_pintu_air.animateAgain();
		})
	</script>
</body>
</html>