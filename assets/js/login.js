    function chart_total_perusahaan () {
        $.getJSON( root + 'index.php/json_perusahaan/get_total_perusahaan', function (data) {
            var chart_jumlah_perusahaan = AmCharts.makeChart("chart",
                {
                    "type": "serial",
                    "categoryField": "nama_kabupaten",
                    "colors": ["#2ecc71"],
                    "rotate": true,
                    "angle": 30,
                    "depth3D": 30,
                    "startDuration": 1,
                    "decimalSeparator": ",",
                    "thousandsSeparator": ".",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "labelRotation": 45,
                        "autoWrap": true,
                        "gridCount": data.data.length,
                        "autoGridCount": false,
                        "fontSize": 8
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                            "balloonText": "[[title]] Di [[category]] : <strong>[[value]]</strong>",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "Jumlah Perusahaan",
                            "type": "column",
                            "valueField": "jumlah_perusahaan"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Jumlah Perusahaan"
                        }
                    ],
                    "allLabels": [],
                    "balloon": {},
                    "legend": {
                        "useGraphSettings": true
                    },
                    "titles": [
                        {
                            "id": "Title-1",
                            "size": 15,
                            "text": "Statistik Jumlah Perusahaan"
                        }
                    ],
                    "dataProvider": data.data
                }
            );
        })
    }

    function chart_jumlah_tenaga_kerja ( tahun ) {

        $.getJSON( root+'index.php/json_perusahaan/tenaga_kerja_tahun/' + tahun, function (data) {
            // chart
            var chartDataTenagaKerja = data.data;
            var chart_jumlah_tenaga_kerja = AmCharts.makeChart("chart",{
                "type": "serial",
                "categoryField": "nama_kabupaten",
                "colors": ["#8856a7"],
                "rotate": true,
                "angle": 30,
                "depth3D": 30,
                "startDuration": 1,
                "decimalSeparator": ",",
                "thousandsSeparator": ".",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 45,
                    "autoWrap": true,
                    "gridCount": chartDataTenagaKerja.length,
                    "autoGridCount": false,
                    "fontSize": 8
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] Di [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": "Jumlah Tenaga Kerja",
                        "type": "column",
                        "valueField": "jumlah_tenaga_kerja"
                    }
                ],
                "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Jumlah Tenaga Kerja"
                        }
                    ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Statistik Tenaga Kerja Tahun " + data.tahun
                    }
                ],
                "dataProvider": chartDataTenagaKerja
            });
        });
    }

    function chart_jumlah_produksi ( tahun ) {
        $.getJSON( root + 'index.php/json_perusahaan/produksi_tahun/' + tahun, function (data) {
            var chartDataProduksi = data.data;
            var chart_jumlah_produksi = AmCharts.makeChart("chart",{
                "type": "serial",
                "categoryField": "nama_kabupaten",
                "colors": ["#3182bd"],
                "rotate": true,
                "angle": 30,
                "depth3D": 30,
                "startDuration": 1,
                "decimalSeparator": ",",
                "thousandsSeparator": ".",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 45,
                    "autoWrap": true,
                    "gridCount": chartDataProduksi.length,
                    "autoGridCount": false,
                    "fontSize": 8
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] Di [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": "Total Produksi ( Batang / Tahun )",
                        "type": "column",
                        "valueField": "volume_produksi"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "Total Produksi"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Statistik Total Produksi Tahun " + data.tahun
                    }
                ],
                "dataProvider": chartDataProduksi
            });
        })
    }

    $('#login_result').hide();
    $('#form_login').submit(function(e) {
        e.preventDefault();
        formData = new FormData($(this)[0]);
        $.ajax({
            url: root+'index.php/login/ajax/submit',
                type: 'POST',
                data: formData,
                async:false,
                cache:false,
                processData: false,
                contentType: false,
                success:function (data) {
                    console.log(data.stat);
                    $('#login_result').empty();
                    if ( data.stat == true ) {
                        $('#login_result').show();
                        $('#login_result').addClass('bg-green');
                        $('#login_result').html(data.text);
                        setTimeout(  function(){ 
                            window.location = root+"index.php/home";
                        }, 3000); 
                    }else{
                        $('#login_result').show();
                        $('#login_result').addClass('bg-red');
                        $('#login_result').html(data.text);
                    }
                }
        });
        return false;
    });

    $('#total').hide();
    $('#loading').hide();

    $.getJSON( root + "index.php/json_kabupaten", function( json ) {
        $.each(json, function( i, item ) {
            $('#kabupaten').append('<option value="'+item.id_kabupaten+'">'+item.nama_kabupaten+'</option>');
        })
    });

    $('#cari_chart').click(function () {
        $('#chart').empty();
        var tahun = $('#tahun').val();

        if ( $('#statistik').val() == 'jumlah_perusahaan') {
            chart_total_perusahaan();
        }

        if ( $('#statistik').val() == 'jumlah_tenaga_kerja' ){
            chart_jumlah_tenaga_kerja( tahun );
        }

        if ( $('#statistik').val() == 'volume_produksi' ){
            chart_jumlah_produksi( tahun );
        }
    })

 $('#hapus_pencarian').click(function ( e ) {
   $('#search_result').empty();
   $('#nama_perusahaan').val('');
   $('#total').hide();
   $('#kabupaten').select2().select2("val", null);
   iht_layer.eachLayer(function (layer) {
       layer.setIcon(ihtIcon);
   });
 })

 $('#form_cari').submit(function(e) {
     $('#search_result').empty();
         e.preventDefault();
         formData = new FormData($(this)[0]);
         $.ajax({
             url: root+'index.php/perusahaan/search/front',
               type: 'POST',
               data: formData,
               async:false,
               cache:false,
               processData: false,
               contentType: false,
               beforeSend:function () {
                 console.log('sending');
                 $('#loading').show();
               },
               success:function ( data ) {
                 $('#total').show();
                 $('#total').empty();
                 var foo = eval( data );
                 // console.log( foo.length );
                 $('#total').append( 'Jumlah : ' + foo.length + ' Perusahaan' );
                 $.each(data, function (i, item) {
                   $('#search_result').append('<tr><td>' + item.nama_perusahaan + '</td><td><a href="javascript:void(0)" style="color:#337ab7" class="btn btn-sm btn-default btn-square" onclick="tambah_titik('+item.latitude +', '+item.longitude+', '+ item.id_perusahaan+')"><i class="fa fa-location-arrow fa-border"></i></a></td></tr>');
                 })
               },
               error:function (xhr) {
                 console.log(xhr.statusText + xhr.responseText);
                 alert('PDF tidak bisa dibuat');
               },
               complete:function () {
                 console.log('send complete');
                 $('#loading').hide();
               }
         });
         return false;
     });
 /**
  * 
  *  Function Declaration
  * 
  */

 

 /**
  * 
  *  Variables Initialization
  * 
  */
 var kabupaten_layer;
 var iht_layer = null;
 var source = null;
 var marker;
 var lingkaran;
 var center = 0;
 var navigasi=null;
 var kecamatan_layer;
 var marker_search='';


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
 
 var style_kabupaten = {
   color : "white", 
   weight : 1, 
   opacity : 1, 
   fillOpacity  : 0,
   dashArray : 3
 };

 var style_kabupaten_gelap = {
   color : "#000", 
   weight : 1, 
   opacity : 1, 
   fillOpacity  : 0,
   dashArray : 3
 };
 
 var popupOptions = {
   maxWidth : '600',
   minWidth : '250',
   className : 'custom',
   closeOnClick : true
 };

 /**
  * 
  *  Map initialization
  * 
  */
 var southWest = L.latLng(-8.629903118263488, 108.0780029296875),
   northEast = L.latLng(-6.124169589851178, 112.52746582031249),
   bounds = L.latLngBounds(southWest, northEast);

 var map = L.map('map', {
     center: [-7.416942257739026, 109.259033203125],
     //maxBounds: bounds,
     zoomControl:false,
     zoom: 8,
     minZoom:7,
     maxZoom:17,
 });
// map.fitBounds(bounds);

 var google_roadmap    = new L.Google('ROADMAP');
 var google_hybrid     = new L.Google('HYBRID');
 var google_satelit    = new L.Google('SATELLITE');
 var osm               = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {});
 var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
 var mapbox            = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
                           maxZoom: 18,
                           id: 'mapbox.streets'
                         });

 map.addLayer(Esri_WorldImagery);

 var ihtIcon = L.ExtraMarkers.icon({
     prefix: 'fa', 
     markerColor: 'green-light', 
     icon: 'fa-building', 
     iconColor: 'white',
     shape: 'square'
 });

 var locateIcon = L.ExtraMarkers.icon({
     icon: 'fa-map-marker', 
     markerColor: 'orange', 
     prefix: 'fa',
     iconColor: 'white',
     shape: 'square'
 });

 $.ajax({
   type : "GET",
   async : false,
   global : false,
   url : root + "index.php/perusahaan/geo/json",
   dataType : 'json',
   success : function (data) {
     source = data;
     iht_layer = L.geoJson(data, {
       pointToLayer: function(feature, latlng) {
                 return L.marker(latlng, {
                             icon: ihtIcon
                         })
       },
       onEachFeature: function (feature, layer) {
         var lokasiFoto = root + 'assets/images/foto/' + feature.properties.foto + '.JPG';
         var jenis_produk_show = '';
         var merek_produk_show = '';
         $.each(feature.properties.jenis_produk, function () {
           jenis_produk_show += '<i class="fa fa-caret-right"></i> '+ this.nama_produk +' ('+ this.singkatan_produk +')<br>';
         })
         $.each(feature.properties.merek_produk, function () {
           merek_produk_show += '<i class="fa fa-caret-right"></i> '+ this.nama_merk_dagang_sudah_registrasi +'<br>';
         })
         var popupContent = '<div class="row">' + 
                   '<div class="col-sm-12">' + 
                     '<p class="f-18 m-b-10 m-t-0"><strong>' + feature.properties.nama_perusahaan + '</strong></p>' +
                     '<table class="custom-table">' +
                     '<tr><td valign="top" width="70">Alamat</td><td width="10" valign="top"> : </td><td>' + feature.properties.alamat + ', ' + feature.properties.nama_kabupaten + '</td></tr>' +
                     '<tr><td valign="top" width="70">Pemilik</td><td width="10" valign="top"> : </td><td>' + feature.properties.pemilik + '</td></tr>' +
                     '<tr><td valign="top" width="70">CP</td><td width="10" valign="top"> : </td><td>' + feature.properties.nama_contact_person + '</td></tr>' +
                     '<tr><td valign="top" width="70">Contact</td><td width="10" valign="top"> : </td><td>' + feature.properties.contact + '</td></tr>' +
                     '<tr><td valign="top" width="70">Jenis Produk</td><td width="10" valign="top"> : </td><td>' + jenis_produk_show + '</td></tr>' +
                     '<tr><td valign="top" width="70">Merek</td><td width="10" valign="top"> : </td><td>' + merek_produk_show + '</td></tr>' +
                     '</table>' +
                     '<img class="img img-thumbnail" src="' + lokasiFoto + '" width="350">' +
                   '</div>' +
                   '</br>' +
                   '</div>';

         layer.bindPopup(popupContent, popupOptions);
       }
     });
     iht_layer.addTo(map);
   }
 });

 var baseLayers = {
   "Google Roadmap": google_roadmap,
   "Google Hybrid": google_hybrid,
   "Google Satellite": google_satelit,
   "Open Street Map": osm,
   "ESRI World Imagery": Esri_WorldImagery,
   "Mapbox Street": mapbox
 };
 
 L.control.layers(baseLayers,{
   position : 'topright'
 }).addTo(map);

 new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
 map.scrollWheelZoom.disable();

 function tambah_titik(x, y, id_perusahaan){
     // console.log(x + " "+ y)
     map.panTo(new L.LatLng(parseFloat(x), parseFloat(y)));
     map.setZoom(16);

     iht_layer.eachLayer(function (layer) {
         layer.setIcon(ihtIcon);
         if (layer.feature.properties.id_perusahaan == id_perusahaan ) {
           layer.setIcon(locateIcon);
           // layer.openPopup();
         };
     });
 }