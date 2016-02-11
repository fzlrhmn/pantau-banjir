	//****************** YOUR CUSTOMIZED JAVASCRIPT **********************//
	var notification_success = function (text, url) {
	  var n = $('.page-content').noty({
	            layout :'topRight',
	            text : text,
	            type: 'success',
	            timeout: 5000,
	            theme: 'defaultTheme', // or 'relax'
	            animation : {
	                          open: 'animated bounceInDown', // Animate.css class names
	                          close: 'animated bounceOutUp', // Animate.css class names
	                          easing: 'swing', // unavailable - no need
	                          speed: 500 // unavailable - no need
	                        },
	            callback : {
	              afterClose : function () {
	                // alert('test');
	                window.location = url;
	              }
	            }
	          });
	}

	$('#kabupaten').change(function(e) {
			e.preventDefault();
			var id_kabupaten = $('#kabupaten').val();
			$.getJSON(root+'index.php/json/kabupaten/kecamatan/'+id_kabupaten, function (data) {
					// console.log(data);
					$('#kecamatan').empty();
					$('#desa').empty();
					$('#kecamatan').append('<option value="">-- Pilih Kecamatan --</option>');
					$('#desa').append('<option value="">-- Pilih Desa / Kelurahan --</option>');
					$.each(data, function (i, item) {
						$('#kecamatan').append('<option value="'+data[i].id_kecamatan+'">'+data[i].nama_kecamatan+'</option>')
					})
					$('#kecamatan').select2().select2("val", null);
					$('#desa').select2().select2("val", null);
				});
			return false;
		});

	$('#kecamatan').change(function(e) {
			e.preventDefault();
			
			var id_kabupaten = $('#kabupaten').val();
			var id_kecamatan = $('#kecamatan').val();

			$.getJSON(root+'index.php/json/kabupaten/kecamatan/kelurahan/' + id_kabupaten + '/' + id_kecamatan, function (data) {
					// console.log(data);
					$('#desa').empty();
					$('#desa').append('<option value="">-- Pilih Desa / Kelurahan --</option>');
					$.each(data, function (i, item) {
						$('#desa').append('<option value="'+data[i].id_desa+'">'+data[i].desa+'</option>')
					})
					$('#desa').select2().select2("val", null);
				});
			return false;
		});

	// $('#kabupaten').hide();
	$('#status').change(function(e) {
			e.preventDefault();
			
			if ($('#status').val() == '0') {
				$('#kabupaten').show();
			}else{
				$('#id_kabupaten').select2().select2("val", '0');
				$('#kabupaten').hide();
			};

			return false;
		});

	// CLONE EDUCATION LABOUR
	function deleteRowEducationLabour(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#gender_labour_'+data).remove();
		};	
	}

	var h = $( "#table-editable0 tbody tr" ).length;
	$('#clone_education_labour').click(function (event) {
		var row_education_labour = '<tr id="gender_labour_' + h + '">' + 
									'<td><input type="hidden" name="fpria[]" id="fpria_'+h+'" value="'+$('#fpria').val()+'"><span id="fpria_content_'+h+'">'+$('#fpria').val()+'</span></td>' +
									'<td><input type="hidden" name="fwanita[]" id="fwanita_'+h+'" value="'+$('#fwanita').val()+'"><span id="fwanita_content_'+h+'">'+$('#fwanita').val()+'</span></td>' +
									'<td><input type="hidden" name="ftts[]" id="ftts_'+h+'" value="'+$('#ftts').val()+'"><span id="ftts_content_'+h+'">'+$('#ftts').val()+'</span></td>' + 
									'<td><input type="hidden" name="fsd[]" id="fsd_'+h+'" value="'+$('#fsd').val()+'"><span id="fsd_content_'+h+'">'+$('#fsd').val()+'</span></td>' + 
									'<td><input type="hidden" name="fsltp[]" id="fsltp_'+h+'" value="'+$('#fsltp').val()+'"><span id="fsltp_content_'+h+'">'+$('#fsltp').val()+'</span></td>' + 
									'<td><input type="hidden" name="fslta[]" id="fslta_'+h+'" value="'+$('#fslta').val()+'"><span id="fslta_content_'+h+'">'+$('#fslta').val()+'</span></td>' + 
									'<td><input type="hidden" name="fd3[]" id="fd3_'+h+'" value="'+$('#fd3').val()+'"><span id="fd3_content_'+h+'">'+$('#fd3').val()+'</span></td>' + 
									'<td><input type="hidden" name="fs1[]" id="fs1_'+h+'" value="'+$('#fs1').val()+'"><span id="fs1_content_'+h+'">'+$('#fs1').val()+'</span></td>' + 
									'<td><input type="hidden" name="fs2[]" id="fs2_'+h+'" value="'+$('#fs2').val()+'"><span id="fs2_content_'+h+'">'+$('#fs2').val()+'</span></td>' + 
									'<td><input type="hidden" name="fs3[]" id="fs3_'+h+'" value="'+$('#fs3').val()+'"><span id="fs3_content_'+h+'">'+$('#fs3').val()+'</span></td>' + 
									'<td><input type="hidden" name="ftahun_pendidikan[]" id="ftahun_pendidikan_'+h+'" value="'+$('#tahun_pendidikan').val()+'"><span id="ftahun_pendidikan_content_'+h+'">'+$('#tahun_pendidikan').val()+'</span></td>' + 
									'<td><a class="edit btn btn-sm btn-danger" onClick="deleteRowEducationLabour(' + h + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#table-editable0 tbody tr:last').after(row_education_labour);
		$('#fpria').val('');
		$('#fwanita').val('');
		$('#ftts').val('');
		$('#fsd').val('');
		$('#fsltp').val('');
		$('#fslta').val('');
		$('#fd3').val('');
		$('#fs1').val('');
		$('#fs2').val('');
		$('#fs3').val('');
		$('#tahun_pendidikan').val('');
		h++;
	})

	// CLONE JENIS PRODUK
	function deleteRowJenisProduk(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#jenis_produk_'+data).remove();
		};	
	}

	var i = $( "#table-editable2 tbody tr" ).length;
	$('#clone_jenis_produk').click(function (event) {
		var row_jenis_produk = '<tr id="jenis_produk_' + i + '"><td><input type="hidden" name="id_produk_volume[]" id="id_produk_volume_'+i+'" value="'+$('#jenis_produk_nilai_volume').val()+'"><span id="id_produk_volume_content_'+i+'">'+$('#jenis_produk_nilai_volume  option:selected').text()+'</span></td><td><input type="hidden" name="fnilai_produksi[]" id="nilai_produksi_'+i+'" value="'+$('#nilai_produksi').val()+'"><span id="nilai_produksi_content_'+i+'">'+$('#nilai_produksi').val()+'</span></td><td><input type="hidden" name="fvolume_produksi[]" id="volume_produksi_'+i+'" value="'+$('#volume_produksi').val()+'"><span id="volume_produksi_content_'+i+'">'+$('#volume_produksi').val()+'</span></td><td><input type="hidden" name="fbulan_produksi[]" id="bulan_produksi_'+i+'" value="'+$('#bulan_produksi').val()+'"><span id="bulan_produksi_content_'+i+'">'+$('#bulan_produksi  option:selected').text()+'</span></td><td><input type="hidden" name="ftahun_produksi[]" id="tahun_produksi_'+i+'" value="'+$('#tahun_produksi').val()+'"><span id="tahun_produksi_content_'+i+'">'+$('#tahun_produksi').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowJenisProduk(' + i + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#table-editable2 tbody tr:last').after(row_jenis_produk);
		$('#jenis_produk_nilai_volume').select2().select2("val", null);
		$('#nilai_produksi').val('');
		$('#volume_produksi').val('');
		$('#bulan_produksi').select2().select2("val", '0');
		$('#tahun_produksi').val('');
		i++;
	})

	// CLONE PERIJINAN PERUSAHAAN
	function deleteRowPerijinan(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#perijinan_'+data).remove();
		};	
	}

	var j = $( "#table-editable3 tbody tr" ).length;
	$('#clone_perijinan').click(function (event) {
		event.preventDefault();
		var row_perijinan = '<tr id="perijinan_' + j + '"><td><input type="hidden" name="fnama_izin[]" id="nama_izin_'+ j +'" value="'+$('#nama_perijinan').val()+'"><span id="nama_perijinan_content_' + j + '">'+$('#nama_perijinan').val()+'</span></td><td><input type="hidden" name="fsingkatan_izin[]" id="singkatan_izin_'+ j +'" value="'+$('#singkatan_izin').val()+'"><span id="singkatan_izin_content_'+ j +'">'+$('#singkatan_izin').val()+'</span></td><td><input type="hidden" name="fnomor_izin[]" id="nomor_izin_'+ j +'" value="'+$('#nomor_izin').val()+'"><span id="nomor_izin_content_'+ j +'">'+$('#nomor_izin').val()+'</span></td><td><input type="hidden" name="ftanggal_izin[]" id="tanggal_izin_'+ j +'" value="'+$('#tanggal_izin').val()+'"><span id="tanggal_izin_content_'+ j +'">'+$('#tanggal_izin').val()+'</span></td><td><input type="hidden" name="finstansi_pemberi_izin[]" id="instansi_pemberi_izin_'+ j +'" value="'+$('#instansi_pemberi_izin').val()+'"><span id="instansi_pemberi_izin_content_'+ j +'">'+$('#instansi_pemberi_izin').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowPerijinan(' +  j  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#table-editable3 tbody tr:last').after(row_perijinan);
		$('#nama_perijinan').val('');
		$('#singkatan_izin').val('');
		$('#nomor_izin').val('');
		$('#tanggal_izin').val('');
		$('#instansi_pemberi_izin').val('');
		j++;
	})

	// CLONE PEMBELIAN PITA CUKAI PERUSAHAAN
	function deleteRowPitaCukai(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#cukai_'+data).remove();
		};	
	}

	var k = $( "#table-editable4 tbody tr" ).length;
	$('#clone_cukai').click(function (event) {
		event.preventDefault();
		var row_cukai = '<tr id="cukai_' + k + '"><td><input type="hidden" name="ftahun_cukai[]" id="tahun_cukai_'+ k +'" value="'+$('#tahun_cukai').val()+'"><span id="tahun_cukai_content_' + k + '">'+$('#tahun_cukai').val()+'</span></td><td><input type="hidden" name="fjumlah_cukai[]" id="jumlah_cukai_'+ k +'" value="'+$('#jumlah_cukai').val()+'"><span id="jumlah_cukai_content_'+ k +'">'+$('#jumlah_cukai').val()+'</span></td><td><input type="hidden" name="frealisasi_cukai[]" id="realisasi_cukai_'+ k +'" value="'+$('#realisasi_cukai').val()+'"><span id="realisasi_cukai_content_'+ k +'">'+$('#realisasi_cukai').val()+'</span></td><td><input type="hidden" name="fbulan_cukai[]" id="bulan_cukai_'+ k +'" value="'+$('#bulan_cukai').val()+'"><span id="bulan_cukai_content_'+ k +'">'+$('#bulan_cukai option:selected').text()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowPitaCukai(' +  k  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#table-editable4 tbody tr:last').after(row_cukai);
		$('#tahun_cukai').val('');
		$('#jumlah_cukai').val('');
		$('#realisasi_cukai').val('');
		$('#bulan_cukai').select2().select2("val", '0');
		k++;
	})

	// CLONE DETAIL JENIS PRODUKSI PRODUK
	function deleteRowProduksi(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#produksi_'+data).remove();
		};	
	}

	var m = $( "#tabel_produksi tbody tr" ).length;
	$('#clone_produksi').click(function (event) {
		event.preventDefault();
		var row_produksi = '<tr id="produksi_' + m + '"><td><input type="hidden" name="idproduk_merek[]" id="idproduk_merek_'+ m +'" value="'+$('#idproduk_merek').val()+'"><span id="idproduk_merek_content_' + m + '">'+$('#idproduk_merek  option:selected').text()+'</span></td><td><input type="hidden" name="fmerek_produk[]" id="merek_produk_'+ m +'" value="'+$('#merek_produk').val()+'"><span id="merek_produk_content_'+ m +'">'+$('#merek_produk').val()+'</span></td><td><input type="hidden" name="fkapasitas_produk[]" id="kapasitas_produk_'+ m +'" value="'+$('#kapasitas_produk').val()+'"><span id="kapasitas_produk_content_'+ m +'">'+$('#kapasitas_produk').val()+'</span></td><td><input type="hidden" name="fkapasitasrill_produk[]" id="kapasitasrill_produk_'+ m +'" value="'+$('#kapasitasrill_produk').val()+'"><span id="kapasitasrill_produk_content_'+ m +'">'+$('#kapasitasrill_produk').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowProduksi(' +  m  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_produksi tbody tr:last').after(row_produksi);
		$('#idproduk_merek').select2().select2("val", null);
		$('#merek_produk').val('');
		$('#kapasitas_produk').val('');
		$('#kapasitasrill_produk').val('')
		m++;
	})

	// CLONE DETAIL BAHAN BAKU
	function deleteRowBahanBaku(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#bahanbaku_'+data).remove();
		};	
	}

	var n = $( "#tabel_bahan_baku tbody tr" ).length;
	$('#clone_bahan_baku').click(function (event) {
		event.preventDefault();
		var row_bahan_baku = '<tr id="bahanbaku_' + n + '"><td><input type="hidden" name="fbahanbaku[]" id="bahanbaku_'+ n +'" value="'+$('#bahan_baku').val()+'"><span id="bahanbaku_content_' + n + '">'+$('#bahan_baku  option:selected').text()+'</span></td><td><input type="hidden" name="ftahun_bahanbaku[]" id="tahun_bahan_baku_'+ n +'" value="'+$('#tahun_bahan_baku').val()+'"><span id="tahun_bahan_baku_content_'+ n +'">'+$('#tahun_bahan_baku').val()+'</span></td><td><input type="hidden" name="fjumlah_bahanbaku[]" id="jumlah_bahan_baku_'+ n +'" value="'+$('#jumlah_bahan_baku').val()+'"><span id="jumlah_bahan_baku_content_'+ n +'">'+$('#jumlah_bahan_baku').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowBahanBaku(' +  n  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_bahan_baku tbody tr:last').after(row_bahan_baku);
		$('#bahan_baku').select2().select2("val", null);
		$('#tahun_bahan_baku').val('');
		$('#jumlah_bahan_baku').val('');
		n++;
	})

	// CLONE DETAIL BAHAN PEMBANTU
	function deleteRowBahanPembantu(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#bahanpembantu_'+data).remove();
		};	
	}

	var o = $( "#tabel_bahan_pembantu tbody tr" ).length;
	$('#clone_bahan_pembantu').click(function (event) {
		event.preventDefault();
		var row_bahan_pembantu = '<tr id="bahanpembantu_' + o + '"><td><input type="hidden" name="fbahanpembantu[]" id="bahanpembantu_'+ o +'" value="'+$('#bahan_pembantu').val()+'"><span id="bahanpembantu_content_' + o + '">'+$('#bahan_pembantu  option:selected').text()+'</span></td><td><input type="hidden" name="fjumlah_bahanpembantu[]" id="jumlah_bahan_pembantu_'+ o +'" value="'+$('#jumlah_bahan_pembantu').val()+'"><span id="jumlah_bahan_pembantu_content_'+ o +'">'+$('#jumlah_bahan_pembantu').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowBahanPembantu(' +  o  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_bahan_pembantu tbody tr:last').after(row_bahan_pembantu);
		$('#bahan_pembantu').select2().select2("val", null);
		$('#jumlah_bahan_pembantu').val('');
		o++;
	})

	// CLONE DETAIL MEREK DAGANG BELUM REGIGSTRASI
	function deleteRowMerekDagang(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#merekdagang_'+data).remove();
		};	
	}

	var p = $( "#tabel_merek_dagang tbody tr" ).length;
	$('#clone_merek_dagang').click(function (event) {
		event.preventDefault();
		var row_merek_dagang_blm = '<tr id="merekdagang_' + p + '"><td><input type="hidden" name="fnamamerekdagang_blm[]" id="namamerekdagang_blm_'+ p +'" value="'+$('#namamerekdagang_blm').val()+'"><span id="namamerekdagang_blm_content_' + p + '">'+$('#namamerekdagang_blm').val()+'</span></td><td><input type="hidden" name="ftahunmerekdagan_blm[]" id="tahunmerekdagan_blm_'+ p +'" value="'+$('#tahunmerekdagan_blm').val()+'"><span id="tahunmerekdagan_blm_content_'+ p +'">'+$('#tahunmerekdagan_blm').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowMerekDagang(' +  p  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_merek_dagang tbody tr:last').after(row_merek_dagang_blm);
		$('#namamerekdagang_blm').val('');
		$('#tahunmerekdagan_blm').val('');
		p++;
	})

	// CLONE DETAIL MEREK DAGANG SUDAH REGISTRASI
	function deleteRowMerekDagangSdh(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#merekdagangsdh_'+data).remove();
		};	
	}

	var q = $( "#tabel_merek_dagang_sdh tbody tr" ).length;
	$('#clone_merek_dagang_sdh').click(function (event) {
		event.preventDefault();
		var row_merek_dagang_sdh = '<tr id="merekdagangsdh_' + q + '"><td><input type="hidden" name="fnamamerekdagang_sdh[]" id="namamerekdagang_sdh_'+ q +'" value="'+$('#namamerekdagang_sdh').val()+'"><span id="namamerekdagang_sdh_content_' + q + '">'+$('#namamerekdagang_sdh').val()+'</span></td><td><input type="hidden" name="ftahunmerekdagan_sdh[]" id="tahunmerekdagan_sdh_'+ q +'" value="'+$('#tahunmerekdagan_sdh').val()+'"><span id="tahunmerekdagan_sdh_content_'+ q +'">'+$('#tahunmerekdagan_sdh').val()+'</span></td><td><input type="hidden" name="fnomorregistrasi_sdh[]" id="nomorregistrasi_sdh_'+ q +'" value="'+$('#nomorregistrasi_sdh').val()+'"><span id="nomorregistrasi_sdh_content_'+ q +'">'+$('#nomorregistrasi_sdh').val()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowMerekDagangSdh(' +  q  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_merek_dagang_sdh tbody tr:last').after(row_merek_dagang_sdh);
		$('#namamerekdagang_sdh').val('');
		$('#tahunmerekdagan_sdh').val('');
		$('#nomorregistrasi_sdh').val('');
		q++;
	})

	// CLONE DETAIL PERKEMBANGAN DALAM NEGERI
	function deleteRowPerkembanganDn(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#perkembangandn_'+data).remove();
		};	
	}

	var r = $( "#tabel_perkembangan_pasar_dn tbody tr" ).length;
	$('#clone_perkembangan_dn').click(function (event) {
		event.preventDefault();
		var row_perkembangan_dn = '<tr id="perkembangandn_' + r + '"><td><input type="hidden" name="idproduk_pemasarandn[]" id="produk_pemasarandn_'+ r +'" value="'+$('#produk_pemasarandn').val()+'"><span id="produk_pemasarandn_content_' + r + '">'+$('#produk_pemasarandn option:selected').text()+'</span></td><td><input type="hidden" name="ftahun_perkembangandn[]" id="tahun_perkembangandn_'+ r +'" value="'+$('#tahun_perkembangandn').val()+'"><span id="tahun_perkembangandn_content_'+ r +'">'+$('#tahun_perkembangandn').val()+'</span></td><td><input type="hidden" name="fjumlah_perkembangandn[]" id="jumlah_perkembangandn_'+ r +'" value="'+$('#jumlah_perkembangandn').val()+'"><span id="jumlah_perkembangandn_content_'+ r +'">'+$('#jumlah_perkembangandn').val()+'</span></td><td><input type="hidden" name="fbulan_perkembangandn[]" id="bulan_perkembangandn_'+ r +'" value="'+$('#bulan_perkembangandn').val()+'"><span id="bulan_perkembangandn_content_'+ r +'">'+$('#bulan_perkembangandn option:selected').text()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowPerkembanganDn(' +  r  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_perkembangan_pasar_dn tbody tr:last').after(row_perkembangan_dn);
		$('#produk_pemasarandn').select2().select2("val", null);
		$('#tahun_perkembangandn').val('');
		$('#jumlah_perkembangandn').val('');
		$('#bulan_perkembangandn').select2().select2("val", '0');
		r++;
	})

	// CLONE DETAIL PERKEMBANGAN LUAR NEGERI
	function deleteRowPerkembanganLn(data) {
		if (confirm('Apakah Anda Yakin Untuk Menghapus Data Ini?')) {
			$('#perkembanganln_'+data).remove();
		};	
	}

	var s = $( "#tabel_perkembangan_pasar_ln tbody tr" ).length;
	$('#clone_perkembangan_ln').click(function (event) {
		event.preventDefault();
		var row_perkembangan_ln = '<tr id="perkembanganln_' + s + '"><td><input type="hidden" name="idproduk_pemasaranln[]" id="produk_pemasaranln_'+ s +'" value="'+$('#produk_pemasaranln').val()+'"><span id="produk_pemasaranln_content_' + s + '">'+$('#produk_pemasaranln option:selected').text()+'</span></td><td><input type="hidden" name="ftahun_perkembanganln[]" id="tahun_perkembanganln_'+ s +'" value="'+$('#tahun_perkembanganln').val()+'"><span id="tahun_perkembanganln_content_'+ s +'">'+$('#tahun_perkembanganln').val()+'</span></td><td><input type="hidden" name="fjumlah_perkembanganln[]" id="jumlah_perkembanganln_'+ s +'" value="'+$('#jumlah_perkembanganln').val()+'"><span id="jumlah_perkembanganln_content_'+ s +'">'+$('#jumlah_perkembanganln').val()+'</span></td><td><input type="hidden" name="fbulan_perkembanganln[]" id="bulan_perkembanganln_'+ s +'" value="'+$('#bulan_perkembanganln').val()+'"><span id="bulan_perkembanganln_content_'+ s +'">'+$('#bulan_perkembanganln option:selected').text()+'</span></td><td><a class="edit btn btn-sm btn-danger" onClick="deleteRowPerkembanganLn(' +  s  + ')"><i class="fa fa-remove"></i> Hapus</a></td></tr>';
		$('#tabel_perkembangan_pasar_ln tbody tr:last').after(row_perkembangan_ln);
		$('#produk_pemasaranln').select2().select2("val", null);
		$('#tahun_perkembanganln').val('');
		$('#jumlah_perkembanganln').val('');
		$('#bulan_perkembanganln').select2().select2("val", '0');
		s++;
	})

	$('.dataTables_filter input').attr("placeholder", "Search");

	$('#form_jenis_produk').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/produk',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	$.getJSON(root+'index.php/json/master/produk', function (data) {
			      			// Nilai dan Volume Produksi
			      			$('#jenis_produk_nilai_volume').empty();
			      			$('#jenis_produk_nilai_volume').append('<option value="">-- Pilih Jenis Produk --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#jenis_produk_nilai_volume').append('<option value="'+data[i].id_jenis_produk+'">'+data[i].nama_produk+' - '+data[i].singkatan_produk+'</option>')
			      			})
			      			
			      			$('#jenis_produk_nilai_volume').select2().select2("val", null);

			      			// Jenis Produk
			      			$('#idproduk_merek').empty();
			      			$('#idproduk_merek').append('<option value="">-- Pilih Jenis Produk --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#idproduk_merek').append('<option value="'+data[i].id_jenis_produk+'">'+data[i].nama_produk+' - '+data[i].singkatan_produk+'</option>')
			      			})
			      			
			      			$('#idproduk_merek').select2().select2("val", null);

			      			// Perkembangan produk Dalam negeri
			      			$('#produk_pemasarandn').empty();
			      			$('#produk_pemasarandn').append('<option value="">-- Pilih Jenis Produk --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#produk_pemasarandn').append('<option value="'+data[i].id_jenis_produk+'">'+data[i].nama_produk+' - '+data[i].singkatan_produk+'</option>')
			      			})
			      			
			      			$('#produk_pemasarandn').select2().select2("val", null);

			      			// Perkembangan produk Dalam negeri
			      			$('#produk_pemasaranln').empty();
			      			$('#produk_pemasaranln').append('<option value="">-- Pilih Jenis Produk --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#produk_pemasaranln').append('<option value="'+data[i].id_jenis_produk+'">'+data[i].nama_produk+' - '+data[i].singkatan_produk+'</option>')
			      			})
			      			
			      			$('#produk_pemasaranln').select2().select2("val", null);
			      		});
			      }
			});
			return false;
		});

	$('#form_bahan_baku').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/bahanbaku',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	$.getJSON(root+'index.php/json/bahanbaku', function (data) {
			      			// Nilai dan Volume Produksi
			      			$('#bahan_baku').empty();
			      			$('#bahan_baku').append('<option value="">-- Bahan Baku --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#bahan_baku').append('<option value="'+data[i].id_bahan_baku+'">'+data[i].nama_bahan_baku+'</option>')
			      			})
			      			
			      			$('#bahan_baku').select2().select2("val", null);
			      		});
			      }
			});
			return false;
		});

	$('#form_bahan_pembantu').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/bahanpembantu',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	$.getJSON(root+'index.php/json/bahanpembantu', function (data) {
			      			// Nilai dan Volume Produksi
			      			$('#bahan_pembantu').empty();
			      			$('#bahan_pembantu').append('<option value="">-- Bahan Pembantu --</option>');
			      			
			      			$.each(data, function (i, item) {
			      				$('#bahan_pembantu').append('<option value="'+data[i].id_bahan_pembantu+'">'+data[i].nama_bahan_pembantu+'</option>')
			      			})
			      			
			      			$('#bahan_pembantu').select2().select2("val", null);
			      		});
			      }
			});
			return false;
		});

	$('#form_jenis_produk_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/produk',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/produk";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Ditambahkan',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#edit_jenis_produk_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/edit/produk',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/produk";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Dirubah',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#form_bahan_baku_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/bahanbaku',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/bahanbaku";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Dirubah',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#edit_bahan_baku_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/edit/bahanbaku',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/bahanbaku";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Dirubah',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#form_bahan_pembantu_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/bahanpembantu',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/bahanpembantu";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Ditambahkan',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#edit_bahan_pembantu_master').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/edit/bahanpembantu',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root+"index.php/master/bahanpembantu";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Dirubah',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#form_create_perusahaan').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/submit/perusahaan',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root + "index.php/perusahaan";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Ditambahkan',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	$('#form_edit_perusahaan').submit(function(e) {
			e.preventDefault();
			formData = new FormData($(this)[0]);
			$.ajax({
				url: root+'index.php/update/perusahaan',
			      type: 'POST',
			      data: formData,
			      async:false,
			      cache:false,
			      processData: false,
			      contentType: false,
			      success:function (data) {
			      	var url			= root + "index.php/perusahaan";
			      	var n = noty({
			      	          layout :'topRight',
			      	          text : 'Data Telah Dirubah',
			      	          type: 'success',
			      	          timeout: 5000,
			      	          theme: 'defaultTheme', // or 'relax'
			      	          animation : {
			      	                        open: 'animated bounceInDown', // Animate.css class names
			      	                        close: 'animated bounceOutUp', // Animate.css class names
			      	                        easing: 'swing', // unavailable - no need
			      	                        speed: 500 // unavailable - no need
			      	                      },
			      	          callback : {
			      	            afterClose : function () {
			      	              window.location = url;
			      	            }
			      	          }
			      	        });
			      }
			});
			return false;
		});

	var table = $('#table').DataTable({
		"searchHighlight": true,
		"lengthMenu": [ [25, 50, 100, -1], [25, 50, 100, "Semua"] ],
		"language": {
		            "sProcessing":   "Sedang memproses...",
		            // "sLengthMenu":   "Tampilkan _MENU_ entri",
		            "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		            "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		            "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		            "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		            "sInfoPostFix":  "",
		            // "sSearch":       "Cari:",
		            "sUrl":          "",
		            "oPaginate": {
		                "sFirst":    "Pertama",
		                "sPrevious": "Sebelumnya",
		                "sNext":     "Selanjutnya",
		                "sLast":     "Terakhir"
		            }
		        },
		"processing": true,
		// "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		"ajax":root + "index.php/perusahaan/json",
		"columns": [
		            { 	
		            	"data": "nomor",
		            	"orderable": true, 
		            	"width":"5%" 
		            },
		            { 	"data": "fnama", 
		            	"orderable": true, 
		            	"width":"15%" 
		            },
		            { 	"data": "falamat", 
		            	"orderable": true, 
		            	"width":"20%"  
		            },
		            { 	"data": "nama_kabupaten", 
		            	"orderable": true, 
		            	"width":"15%"  
		            },
		            { 	"data": "nama_kecamatan", 
		            	"orderable": true, 
		            	"width":"10%"  
		            },
		            { 	"data": null,
		            	"render": function (data) {
		            		if (data.fstatus == 0) {
		            			return '<span style="color:red;">Tidak Aktif</span>';
		            		}else{
		            			return '<span style="color:green;">Aktif</span>';
		            		}
		            	},
		             	"orderable": true, 
		             	"width":"10%" 
		            },
		            { 	"data": null,
		                "render" : function (data) {
		                    return '<div class="row" style="margin-bottom:10px">' +
	                              		'<div class="col-xs-4">' +
	                                		'<a title="Detail" href="' + root + 'index.php/perusahaan/' + data.id_perusahaan + '" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
	                              		'</div>'+
	                            	  	'<div class="col-xs-4">' +
	                            	    	'<a title="Edit" href="' + root + 'index.php/perusahaan/edit/' + data.id_perusahaan + '" class="btn btn-sm btn-success btn-square"><i class="fa fa-pencil-square-o"></i></a>' +
	                            	  	'</div>' +
	                            	  	'<div class="col-xs-4">' +
	                            	    	'<a title="Hapus" href="' + root + 'index.php/perusahaan/delete/' + data.id_perusahaan + '" class="btn btn-sm btn-danger btn-square" onclick="return confirm(\'Apakah Anda Yakin Untuk Menghapus Data Ini?\')"><i class="fa fa-ban"></i></a>' +
	                            	  	'</div>' +
	                            	'</div>';
		                },
		                "orderable": false, 
		             	"width":"15%" 
		            }
		        ],
	});

	// $('#table').each(function () {
	// 	if ($(this).hasClass('filter-head')) {
	// 	    $('.filter-head thead th').each( function () {
	// 	        var title = $('.filter-head thead th').eq($(this).index()).text();
	// 	        $(this).append( '<input type="text" onclick="stopPropagation(event);" class="form-control" id="'+title+'" placeholder="Filter '+title+'" />' );
	// 	    });
	// 	    var table = $('.filter-head').DataTable();
	// 	    $(".filter-head thead input").on( 'keyup change', function () {
	// 	        table.column( $(this).parent().index()+':visible').search( this.value ).draw();
	// 	    });
	// 	}

	// 	if (!$(this).hasClass('filter-head') && !$(this).hasClass('filter-footer') && !$(this).hasClass('filter-select'))  {
	// 	    var oTable = $(this).DataTable(opt);
	// 	    oTable.fnDraw();
	// 	} 
	// })
	// $('#No').remove();
	// $('#Status').width(150);
	// $('#No').remove();

	$('<div class="btn-group"><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel">Cetak Excel</a></li></ul></div>').appendTo('div#table_filter');
	$('#loading').hide();

	$("#print_pdf").click(function() {
	    var rowTable = [];
	    table.rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value.id_perusahaan );
	    });

	    $.ajax({
	    	url: root+'index.php/perusahaan/print/pdf',
	          type: 'POST',
	          data: { perusahaan : rowTable },
	          dataType:"json",
	          beforeSend:function () {
	          	console.log('sending');
	          	$('#loading').show();
	          },
	          success:function (msg) {
	          	console.log( msg );
	          	window.open(msg);
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

	    // console.log( JSON.stringify({ perusahaan: rowTable }) );
	});

	$("#print_excel").click(function() {

	    var rowTable = [];
	    table.rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value.id_perusahaan );
	    });

	    params_perusahaan = rowTable.join();

	    window.open( root + 'index.php/perusahaan/print/excel/' + params_perusahaan );
	});


	function confirm_delete() {
	  return confirm('are you sure?');
	}

	var tahun 	= (new Date).getFullYear();
	localStorage.setItem("tahun", (new Date).getFullYear());
	var tahun 	= localStorage.getItem("tahun");

	redraw_main_table( tahun );

	$('#tahun_profil').select2().select2("val", tahun);

	$('#tahun_profil_submit').click(function ( event ) {
		tahun_profil = $('#tahun_profil').val();
		redraw_main_table( tahun_profil );
		return false;
		event.preventDefault();
	})

	function redraw_main_table ( thn ) {
		$('#profile_table_2').hide();

		$('#profile_table').show();
		$('#profile_toolbar').show();
		$('#profile_table').DataTable().destroy();
		$('#profile_table tbody').empty();

		$('#wilayah').html('Kabupaten');
		var url 	= root + "index.php/report/report_perusahaan?tahun=" + thn;
		var profile_table = $('#profile_table').DataTable({
			"searchHighlight": true,
		    // "lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
		    "paging" : false,
			"bFilter": false,
			// "dom": '<"toolbar">frtip',
		    "language": {
		    			// "thousands": "'",
		                "sProcessing":   "Sedang memproses...",
		                // "sLengthMenu":   "Tampilkan _MENU_ entri",
		                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		                "sInfoPostFix":  "",
		                // "sSearch":       "Cari:",
		                "sUrl":          "",
		                "oPaginate": {
		                    "sFirst":    "Pertama",
		                    "sPrevious": "Sebelumnya",
		                    "sNext":     "Selanjutnya",
		                    "sLast":     "Terakhir"
		                }
		            },
		    "processing": true,
		    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		    "ajax": url,
		    "columns": [
		                { "data": "nomor", "orderable": true, "width":"5%"},
		                { "data": "nama_kabupaten", "orderable": true },
		                { "data": "jumlah_perusahaan", "orderable": true, "className": "align-right" },
		                { "data": "tenaga_kerja", "orderable": true, "className": "align-right" },
		                { "data": "produksi", "orderable": true, "className": "align-right" },
		                // { "data": "id_kabupaten", "orderable": true },
		                { "data": null,
		                    "render" : function (data) {
		                        return '<div class="row" style="margin-bottom:10px">' +
		                                    '<div class="col-xs-4">' +
		                                        '<a title="Detail" href="javascript:void(0)" onClick="show_kecamatan(' + data.id_kabupaten + ', ' + thn + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
		                                    '</div>'+
		                                '</div>';
		                    }
		                    , "orderable": false
		                }
		            ],
		});
		// $('div#profile_table_length').empty();
		// $('div.dataTables_filter').empty();
		// $('<div class="col-xs-6"><select class="form-control" id="tahun_profil"><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option></select></div><div class="col-xs-6"><button class="btn btn-square btn-blue" id="tahun_profil_submit">Submit</button></div>').appendTo('div.dataTables_filter');
		// $('<div class="btn-group"><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel">Cetak Excel</a></li></ul></div>').appendTo('div#profile_table_length');
		return false;
	}

	function show_kecamatan( id_kabupaten, tahun ) {
		$('#profile_table_2').hide();
		$('#profile_table_2_info').hide();
		$('#profile_table_2_paginate').hide();
		$('#profile_table').show();
		$('#profile_toolbar').hide();
		$('#profile_table').DataTable().destroy();
		$('#profile_table tbody').empty();
		
		$('#wilayah').html('Kecamatan');
		$.getJSON(root + "index.php/report/report_kecamatan_perusahaan/" + id_kabupaten + "?tahun=" + tahun, function (data) {
			console.log(data);
			var table = $('#profile_table').DataTable({
				"searchHighlight": true,
		    	"lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
			    // "paging" : false,
			    // "bFilter": false,
			    "language": {
			                "sProcessing":   "Sedang memproses...",
			                // "sLengthMenu":   "Tampilkan _MENU_ entri",
			                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
			                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
			                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
			                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
			                "sInfoPostFix":  "",
			                // "sSearch":       "Cari:",
			                "sUrl":          "",
			                "oPaginate": {
			                    "sFirst":    "Pertama",
			                    "sPrevious": "Sebelumnya",
			                    "sNext":     "Selanjutnya",
			                    "sLast":     "Terakhir"
			                }
			            },
			    "processing": true,
			    // "dom": '<"toolbar">frtip',
			    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
			    // "ajax": ,
			    "data" : data.data,
			    "columns": [
		                	{ "data": "nomor", "orderable": true, "width":"5%"},
			                { "data": "nama_kecamatan", "orderable": true },
			                { "data": "jumlah_perusahaan", "orderable": true, "className": "align-right" },
			                { "data": "tenaga_kerja", "orderable": true, "className": "align-right" },
			                { "data": "produksi", "orderable": true, "className": "align-right" },
			                // { "data": "id_kabupaten", "orderable": true },
			                { "data": null,
			                    "render" : function (data) {
			                        return '<div class="row" style="margin-bottom:10px">' +
			                                    '<div class="col-xs-4">' +
			                                        '<a title="Detail" href="javascript:void(0)" onClick="show_perusahaan(' + data.id_kecamatan + ', ' + data.tahun + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
			                                    '</div>'+
			                                '</div>';
			                    }
			                    , "orderable": false
			                }
			            ],
			});
			$('div#profile_table_length').empty();
			$('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_main_table(' + tahun +')"><i class="fa fa-angle-left"></i> Kembali</button></div>').appendTo('div#profile_table_length');
			// $('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_main_table(' + tahun +')"><i class="fa fa-angle-left"></i> Kembali</button><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading_kec"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel">Cetak Excel</a></li></ul></div>').appendTo('div#profile_table_length');
			$('#loading_kec').hide();
		})
		return false;
	}

	function show_perusahaan( id_kecamatan, tahun ) {
		$('#profile_table_2').show();
		$('#profile_table_2').DataTable().destroy();
		$('#profile_table_2 tbody').empty();

		$('#profile_toolbar').hide();
		$('#profile_table').hide();
		$('#profile_table_info').hide();
		$('#profile_table_paginate').hide();
		// $('#profile_table').DataTable().destroy();
		// $('#profile_table tbody').empty();
		
		$.getJSON(root + "index.php/report/report_perusahaan_kecamatan/" + id_kecamatan + "?tahun=" + tahun, function (data) {
			console.log(data);
			var table = $('#profile_table_2').DataTable({
				"searchHighlight": true,
		    	"lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
			    "paging" : false,
			    "bFilter": false,
			    "language": {
			                "sProcessing":   "Sedang memproses...",
			                // "sLengthMenu":   "Tampilkan _MENU_ entri",
			                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
			                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
			                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
			                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
			                "sInfoPostFix":  "",
			                // "sSearch":       "Cari:",
			                "sUrl":          "",
			                "oPaginate": {
			                    "sFirst":    "Pertama",
			                    "sPrevious": "Sebelumnya",
			                    "sNext":     "Selanjutnya",
			                    "sLast":     "Terakhir"
			                }
			            },
			    "processing": true,
			    // "dom": '<"toolbar">frtip',
			    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
			    // "ajax": ,
			    "data" : data.data,
			    "columns": [
		                	{ "data": "nomor", "orderable": true, "width":"5%"},
			                { "data": "fnama", "orderable": true },
			                { "data": "tenaga_kerja", "orderable": true, "className": "align-right" },
			                { "data": "produksi", "orderable": true, "className": "align-right" },
			                // { "data": "id_kabupaten", "orderable": true },
			                { "data": null,
			                    "render" : function (data) {
			                        return '<div class="row" style="margin-bottom:10px">' +
			                                    '<div class="col-xs-4">' +
			                                        '<a title="Detail" href="'+ root + 'index.php/perusahaan/' + data.id_perusahaan + '" target="_blank" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
			                                    '</div>'+
			                                '</div>';
			                    }
			                    , "orderable": false
			                }
			            ],
			});
			$('div#profile_table_length').empty();
			$('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="show_kecamatan(' + data.id_kabupaten + ',' + data.tahun +')"><i class="fa fa-angle-left"></i> Kembali</button></div>').appendTo('div#profile_table_length');
			// $('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="show_kecamatan(' + data.id_kabupaten + ',' + data.tahun +')"><i class="fa fa-angle-left"></i> Kembali</button><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading_kec"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel">Cetak Excel</a></li></ul></div>').appendTo('div#profile_table_length');
			$('#loading_kec').hide();
		})
		return false;
	}

	// Dynamic table report berdasarkan jenis kelamin
	redraw_gender_table( tahun );

	$('#tahun_gender').select2().select2("val", tahun);

	$('#tahun_gender_submit').click(function ( event ) {
		event.preventDefault();
		tahun_gender = $('#tahun_gender').val();
		redraw_gender_table( tahun_gender );
	})

	function redraw_gender_table ( tahun_gender_table ) {
		$('#profile_toolbar').show();
		$('#gender_table').DataTable().destroy();
		$('#gender_table tbody').empty();

		$('#wilayah').html('Kabupaten');
		var url 	= root + "index.php/report/report_gender_kabupaten?tahun=" + tahun_gender_table;
		var gender_table = $('#gender_table').DataTable({
			"searchHighlight": true,
		    // "lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
		    "paging" : false,
			"bFilter": false,
			// "dom": '<"toolbar">frtip',
		    "language": {
		                "sProcessing":   "Sedang memproses...",
		                // "sLengthMenu":   "Tampilkan _MENU_ entri",
		                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		                "sInfoPostFix":  "",
		                // "sSearch":       "Cari:",
		                "sUrl":          "",
		                "oPaginate": {
		                    "sFirst":    "Pertama",
		                    "sPrevious": "Sebelumnya",
		                    "sNext":     "Selanjutnya",
		                    "sLast":     "Terakhir"
		                }
		            },
		    "processing": true,
		    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		    "ajax": url,
		    "columns": [
		                { "data": "nomor", "orderable": true, "width":"5%"},
		                { "data": "nama_kabupaten", "orderable": true },
		                { "data": "tenaga_kerja_pria", "orderable": true, "className": "align-right" },
		                { "data": "persen_tenaga_kerja_pria", "orderable": true, "className": "align-right" },
		                { "data": "tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
		                { "data": "persen_tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
		                { "data": "jumlah_tenaga_kerja", "orderable": true, "className": "align-right" },
		                { "data": "persen_tenaga_kerja_total", "orderable": true, "className": "align-right" },
		                // { "data": "id_kabupaten", "orderable": true },
		                { "data": null,
		                    "render" : function (data) {
		                        return '<div class="row" style="margin-bottom:10px">' +
		                                    '<div class="col-xs-4">' +
		                                        '<a title="Detail" href="javascript:void(0)" onClick="show_gender_kecamatan(' + data.id_kabupaten + ', ' + tahun_gender_table + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
		                                    '</div>'+
		                                '</div>';
		                    }
		                    , "orderable": false
		                }
		            ],
		});
	}

	/**
	 * 
	 * 
	 * CLICK EVENT PRINT PDF AND EXCEL
	 * 
	 * 
	 */
	$("#print_pdf_gender_kabupaten").click(function() {

	    var rowTable = [];
	    $('#gender_table').DataTable().rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value );
	    });
	    $.ajax({
	    	url: root+'index.php/print/gender/kabupaten?type=pdf&tahun=' + $('#tahun_gender').val(),
	          type: 'POST',
	          data: { perusahaan : rowTable },
	          dataType:"json",
	          success:function (msg) {
	          	console.log( msg );
	          	window.open( msg );
	          }
	    });
	});

	$("#print_excel_gender_kabupaten").click(function() {

	    var rowTable = [];
	    $('#gender_table').DataTable().rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value );
	    });
	    $.ajax({
	    	url: root+'index.php/print/gender/kabupaten?type=excel&tahun=' + $('#tahun_gender').val(),
	          type: 'POST',
	          data: { perusahaan : rowTable },
	          dataType:"json",
	          success:function (msg) {
	          	// console.log( msg );
	          	window.open( msg );
	          }
	    });
	});

	/**
	 * 
	 * 
	 * END OF CLICK EVENT PRINT PDF AND EXCEL
	 * 
	 * 
	 */

	function show_gender_kecamatan( id_kabupaten, tahun ) {
		$('#profile_toolbar').hide();
		$('#gender_table').DataTable().destroy();
		$('#gender_table tbody').empty();
		
		$('#wilayah').html('Kecamatan');
		$.getJSON(root + "index.php/report/report_gender_kecamatan/" + id_kabupaten + "?tahun=" + tahun, function (data) {
			var gender_table = $('#gender_table').DataTable({
				"searchHighlight": true,
		    	"lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
			    // "paging" : false,
			    // "bFilter": false,
			    "language": {
			                "sProcessing":   "Sedang memproses...",
			                // "sLengthMenu":   "Tampilkan _MENU_ entri",
			                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
			                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
			                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
			                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
			                "sInfoPostFix":  "",
			                // "sSearch":       "Cari:",
			                "sUrl":          "",
			                "oPaginate": {
			                    "sFirst":    "Pertama",
			                    "sPrevious": "Sebelumnya",
			                    "sNext":     "Selanjutnya",
			                    "sLast":     "Terakhir"
			                }
			            },
			    "processing": true,
			    // "dom": '<"toolbar">frtip',
			    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
			    // "ajax": ,
			    "data" : data.data,
			    "columns": [
		                	{ "data": "nomor", "orderable": true, "width":"5%"},
			                { "data": "nama_kecamatan", "orderable": true },
			                { "data": "tenaga_kerja_pria", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_pria", "orderable": true, "className": "align-right" },
			                { "data": "tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
			                { "data": "jumlah_tenaga_kerja", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_total", "orderable": true, "className": "align-right" },
			                // { "data": "id_kabupaten", "orderable": true },
			                { "data": null,
			                    "render" : function (data) {
			                        return '<div class="row" style="margin-bottom:10px">' +
			                                    '<div class="col-xs-4">' +
			                                        '<a title="Detail" href="javascript:void(0)" onClick="show_gender_perusahaan(' + data.id_kabupaten + ', ' + data.id_kecamatan + ' , ' + tahun + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
			                                    '</div>'+
			                                '</div>';
			                    }
			                    , "orderable": false
			                }
			            ],
			});
			$('div#gender_table_length').empty();
			// $('div#gender_table_length').append('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_gender_table(' + tahun +')"><i class="fa fa-angle-left"></i> Kembali</button><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading_kec"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf_gender_kecamatan">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel_gender_kecamatan">Cetak Excel</a></li></ul></div>');
			$('div#gender_table_length').append('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_gender_table(' + tahun +')"><i class="fa fa-angle-left"></i> Kembali</button></div>');
			$('#loading_kec').hide();
		})
	}

	/**
	 * 
	 * 
	 * CLICK EVENT PRINT PDF AND EXCEL
	 * 
	 * 
	 */
	$("#print_pdf_gender_kecamatan").click(function() {

	    var rowTable = [];
	    $('#gender_table').DataTable().rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value );
	    });
		// console.log('tes');
	    // $.ajax({
	    // 	url: root+'index.php/print/gender/kabupaten?type=pdf&tahun=' + $('#tahun_gender').val(),
	    //       type: 'POST',
	    //       data: { perusahaan : rowTable },
	    //       dataType:"json",
	    //       success:function (msg) {
	    //       	console.log( msg );
	    //       	window.open( msg );
	    //       }
	    // });
	});

	$("#print_excel_gender_kecamatan").click(function() {

	    var rowTable = [];
	    $('#gender_table').DataTable().rows( { search:'applied' } ).data().each(function(value, index) {
	        rowTable.push( value );
	    });
	    // $.ajax({
	    // 	url: root+'index.php/print/gender/kabupaten?type=excel&tahun=' + $('#tahun_gender').val(),
	    //       type: 'POST',
	    //       data: { perusahaan : rowTable },
	    //       dataType:"json",
	    //       success:function (msg) {
	    //       	// console.log( msg );
	    //       	window.open( msg );
	    //       }
	    // });
	});

	/**
	 * 
	 * 
	 * END OF CLICK EVENT PRINT PDF AND EXCEL
	 * 
	 * 
	 */

	function show_gender_perusahaan( id_kabupaten, id_kecamatan, tahun ) {
		$('#profile_toolbar').hide();
		$('#gender_table').DataTable().destroy();
		$('#gender_table tbody').empty();
		
		$('#wilayah').html('Nama Perusahaan');
		$.getJSON(root + "index.php/report/report_gender_perusahaan/" + id_kabupaten + "/" + id_kecamatan + "?tahun=" + tahun, function (data) {
			console.log(data);
			var gender_table = $('#gender_table').DataTable({
				"searchHighlight": true,
		    	"lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
			    // "paging" : false,
			    // "bFilter": false,
			    "language": {
			                "sProcessing":   "Sedang memproses...",
			                // "sLengthMenu":   "Tampilkan _MENU_ entri",
			                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
			                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
			                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
			                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
			                "sInfoPostFix":  "",
			                // "sSearch":       "Cari:",
			                "sUrl":          "",
			                "oPaginate": {
			                    "sFirst":    "Pertama",
			                    "sPrevious": "Sebelumnya",
			                    "sNext":     "Selanjutnya",
			                    "sLast":     "Terakhir"
			                }
			            },
			    "processing": true,
			    // "dom": '<"toolbar">frtip',
			    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
			    // "ajax": ,
			    "data" : data.data,
			    "columns": [
		                	{ "data": "nomor", "orderable": true, "width":"5%"},
			                { "data": "fnama", "orderable": true },
			                { "data": "tenaga_kerja_pria", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_pria", "orderable": true, "className": "align-right" },
			                { "data": "tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_wanita", "orderable": true, "className": "align-right" },
			                { "data": "jumlah_tenaga_kerja", "orderable": true, "className": "align-right" },
			                { "data": "persen_tenaga_kerja_total", "orderable": true, "className": "align-right" },
			                // { "data": "id_kabupaten", "orderable": true },
			                { "data": null,
			                    "render" : function (data) {
			                        return '<div class="row" style="margin-bottom:10px">' +
			                                    '<div class="col-xs-4">' +
			                                        '<a title="Detail" href="'+ root + 'index.php/perusahaan/' + data.id_perusahaan + '" target="_blank" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
			                                    '</div>'+
			                                '</div>';
			                    }
			                    , "orderable": false
			                }
			            ],
			});
			$('div#gender_table_length').empty();
			// $('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="show_gender_kecamatan(' + data.id_kabupaten + ', ' + tahun + ')"><i class="fa fa-angle-left"></i> Kembali</button></div>').appendTo('div#gender_table_length');
			$('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="show_gender_kecamatan(' + data.id_kabupaten + ', ' + tahun + ')"><i class="fa fa-angle-left"></i> Kembali</button></div>').appendTo('div#gender_table_length');
			$('#loading_kec').hide();
		})
	}

	// Dynamic table report berdasarkan pendidikan
	redraw_pendidikan_table( tahun );

	$('#tahun_pendidikan_table').select2().select2("val", tahun);

	$('#tahun_pendidikan_table_submit').click(function ( event ) {
		event.preventDefault();
		tahun_pendidikan_table = $('#tahun_pendidikan_table').val();
		redraw_pendidikan_table( tahun_pendidikan_table );
	})

	function redraw_pendidikan_table ( tahun_pendidikan_table ) {
		$('div#pendidikan_toolbar').show();
		$('div#pendidikan_toolbar_2').hide();
		$('#table_pendidikan').DataTable().destroy();
		$('#table_pendidikan tbody').empty();

		$('#wilayah').html('Kabupaten');
		var url 	= root + "index.php/report/report_pendidikan_kabupaten?tahun=" + tahun_pendidikan_table;
		var table_pendidikan = $('#table_pendidikan').DataTable({
			"searchHighlight": true,
		    // "lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
		    "paging" : false,
			"bFilter": false,
			// "dom": '<"toolbar">frtip',
		    "language": {
		                "sProcessing":   "Sedang memproses...",
		                // "sLengthMenu":   "Tampilkan _MENU_ entri",
		                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		                "sInfoPostFix":  "",
		                // "sSearch":       "Cari:",
		                "sUrl":          "",
		                "oPaginate": {
		                    "sFirst":    "Pertama",
		                    "sPrevious": "Sebelumnya",
		                    "sNext":     "Selanjutnya",
		                    "sLast":     "Terakhir"
		                }
		            },
		    "processing": true,
		    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		    "ajax": url,
		    "columns": [
		                { "data": "nomor", "orderable": true, "width":"5%"},
		                { "data": "nama_kabupaten", "orderable": true },
		                { "data": "tidak_tamat_sekolah", "orderable": true, "className": "align-right" },
		                { "data": "sd", "orderable": true, "className": "align-right" },
		                { "data": "sltp", "orderable": true, "className": "align-right" },
		                { "data": "slta", "orderable": true, "className": "align-right" },
		                { "data": "diploma", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_1", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_2", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_3", "orderable": true, "className": "align-right" },
		                { "data": "total", "orderable": true, "className": "align-right" },
		                { "data": null,
		                    "render" : function (data) {
		                        return '<div class="row" style="margin-bottom:10px">' +
		                                    '<div class="col-xs-4">' +
		                                        '<a title="Detail" href="javascript:void(0)" onClick="redraw_pendidikan_table_kecamatan(' + data.id_kabupaten + ', ' + tahun_pendidikan_table + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
		                                    '</div>'+
		                                '</div>';
		                    }
		                    , "orderable": false
		                }
		            ],
		});

		$("#print_excel_pendidikan_kabupaten").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/kabupaten?type=excel&tahun=' + $('#tahun_pendidikan_table').val(),
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	console.log( msg );
		          	window.open( msg );
		          }
		    });
		});

		$("#print_pdf_pendidikan_kabupaten").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/kabupaten?type=pdf&tahun=' + $('#tahun_pendidikan_table').val(),
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	// console.log( msg );
		          	window.open( msg );
		          }
		    });
		});

		return false;
	}

	function redraw_pendidikan_table_kecamatan ( id_kabupaten, tahun_pendidikan_table ) {

		$('div#pendidikan_toolbar_2').show();
		$('div#pendidikan_toolbar').hide();
		$('#table_pendidikan').DataTable().destroy();
		$('#table_pendidikan tbody').empty();

		$('#wilayah').html('Kecamatan');
		var url 	= root + "index.php/report/report_pendidikan_kecamatan/" + id_kabupaten + "?tahun=" + tahun_pendidikan_table;
		var table_pendidikan = $('#table_pendidikan').DataTable({
			"searchHighlight": true,
		    // "lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
		    "paging" : false,
			"bFilter": false,
			// "dom": '<"toolbar">frtip',
		    "language": {
		                "sProcessing":   "Sedang memproses...",
		                // "sLengthMenu":   "Tampilkan _MENU_ entri",
		                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		                "sInfoPostFix":  "",
		                // "sSearch":       "Cari:",
		                "sUrl":          "",
		                "oPaginate": {
		                    "sFirst":    "Pertama",
		                    "sPrevious": "Sebelumnya",
		                    "sNext":     "Selanjutnya",
		                    "sLast":     "Terakhir"
		                }
		            },
		    "processing": true,
		    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		    "ajax": url,
		    "columns": [
		                { "data": "nomor", "orderable": true, "width":"5%"},
		                { "data": "nama_kecamatan", "orderable": true },
		                { "data": "tidak_tamat_sekolah", "orderable": true, "className": "align-right" },
		                { "data": "sd", "orderable": true, "className": "align-right" },
		                { "data": "sltp", "orderable": true, "className": "align-right" },
		                { "data": "slta", "orderable": true, "className": "align-right" },
		                { "data": "diploma", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_1", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_2", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_3", "orderable": true, "className": "align-right" },
		                { "data": "total", "orderable": true, "className": "align-right" },
		                { "data": null,
		                    "render" : function (data) {
		                        return '<div class="row" style="margin-bottom:10px">' +
		                                    '<div class="col-xs-4">' +
		                                        '<a title="Detail" href="javascript:void(0)" onClick="redraw_pendidikan_table_perusahaan(' + data.id_kabupaten + ', ' + data.id_kecamatan + ' , ' + tahun_pendidikan_table + ')" class="btn btn-sm btn-info btn-square"><i class="fa fa-search"></i></a>' +
		                                    '</div>'+
		                                '</div>';
		                    }
		                    , "orderable": false
		                }
		            ],
		});
		$('div#pendidikan_toolbar_2').empty();
		$('div#pendidikan_toolbar_2').append('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_pendidikan_table(' + tahun + ')"><i class="fa fa-angle-left"></i> Kembali</button><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading_kec"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf_pendidikan">Cetak PDF</a></li><li><a href="javascript:void(0)" target="_blank" id="print_excel_pendidikan">Cetak Excel</a></li></ul></div>');
		$('#loading_kec').hide();

		$("#print_excel_pendidikan").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/kecamatan?type=excel&tahun=' + tahun + '&kabupaten=' + id_kabupaten,
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	console.log( msg );
		          	window.open( msg );
		          }
		    });
		});

		$("#print_pdf_pendidikan").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/kecamatan?type=pdf&tahun=' + tahun + '&kabupaten=' + id_kabupaten,
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	console.log( msg );
		          	window.open( msg );
		          }
		    });
		});
	}

	function redraw_pendidikan_table_perusahaan ( id_kabupaten, id_kecamatan, tahun_pendidikan_table ) {
		$('#table_pendidikan').DataTable().destroy();
		$('#table_pendidikan tbody').empty();

		$('#wilayah').html('Perusahaan');
		var url 	= root + "index.php/report/report_pendidikan_perusahaan/" + id_kabupaten + "/" + id_kecamatan + "?tahun=" + tahun_pendidikan_table;
		var table_pendidikan = $('#table_pendidikan').DataTable({
			"searchHighlight": true,
		    // "lengthMenu": [ [50, 100, 150, -1], [50, 100, 150, "Semua Data"] ],
		    "paging" : false,
			"bFilter": false,
			// "dom": '<"toolbar">frtip',
		    "language": {
		                "sProcessing":   "Sedang memproses...",
		                // "sLengthMenu":   "Tampilkan _MENU_ entri",
		                "sZeroRecords":  "Tidak ditemukan data yang sesuai",
		                "sInfo":         "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
		                "sInfoEmpty":    "Menampilkan 0 sampai 0 dari 0 entri",
		                "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
		                "sInfoPostFix":  "",
		                // "sSearch":       "Cari:",
		                "sUrl":          "",
		                "oPaginate": {
		                    "sFirst":    "Pertama",
		                    "sPrevious": "Sebelumnya",
		                    "sNext":     "Selanjutnya",
		                    "sLast":     "Terakhir"
		                }
		            },
		    "processing": true,
		    // "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		    "ajax": url,
		    "columns": [
		                { "data": "nomor", "orderable": true, "width":"5%"},
		                { "data": "fnama", "orderable": true },
		                { "data": "tidak_tamat_sekolah", "orderable": true, "className": "align-right" },
		                { "data": "sd", "orderable": true, "className": "align-right" },
		                { "data": "sltp", "orderable": true, "className": "align-right" },
		                { "data": "slta", "orderable": true, "className": "align-right" },
		                { "data": "diploma", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_1", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_2", "orderable": true, "className": "align-right" },
		                { "data": "sarjana_3", "orderable": true, "className": "align-right" },
		                { "data": "total", "orderable": true, "className": "align-right" },
		                { "data": null,
		                    "render" : function (data) {
		                        return '<div class="row" style="margin-bottom:10px">' +
		                                    '<div class="col-xs-4">' +
		                                        '<a title="Detail" href="'+ root + 'index.php/perusahaan/' + data.id_perusahaan + '" target="_blank" class="btn btn-sm btn-primary btn-square"><i class="fa fa-search"></i></a>' +
		                                    '</div>'+
		                                '</div>';
		                    }
		                    , "orderable": false
		                }
		            ],
		});

		$('div#pendidikan_toolbar_2').empty();
		$('div#pendidikan_toolbar_2').append('<div class="btn-group"><button type="button" class="btn btn-success btn-square" onClick="redraw_pendidikan_table_kecamatan(' + id_kabupaten + ',' + tahun + ')"><i class="fa fa-angle-left"></i> Kembali</button><button type="button" class="btn btn-info btn-square dropdown-toggle" data-toggle="dropdown"><i class="fa fa-spinner fa-spin" id="loading_kec"></i> Cetak <span class="caret"></span></button><span class="dropdown-arrow"></span><ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0)" id="print_pdf_pendidikan_perusahaan">Cetak PDF</a></li><li><a href="javascript:void(0)" id="print_excel_pendidikan_perusahaan">Cetak Excel</a></li></ul></div>');
		$('#loading_kec').hide();

		$("#print_excel_pendidikan_perusahaan").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/perusahaan?type=excel&tahun=' + tahun + '&kecamatan=' + id_kecamatan,
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	console.log( msg );
		          	window.open( msg );
		          }
		    });
		});

		$("#print_pdf_pendidikan_perusahaan").click(function() {

		    var rowTable = [];
		    table_pendidikan.rows( { search:'applied' } ).data().each(function(value, index) {
		        rowTable.push( value );
		    });
		    console.log(rowTable);
		    $.ajax({
		    	url: root+'index.php/print/pendidikan/perusahaan?type=pdf&tahun=' + tahun + '&kecamatan=' + id_kecamatan,
		          type: 'POST',
		          data: { perusahaan : rowTable },
		          dataType:"json",
		          success:function (msg) {
		          	console.log( msg );
		          	window.open( msg );
		          }
		    });
		});
	}
