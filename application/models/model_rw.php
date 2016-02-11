<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_rw extends CI_Model {

	public function get_rw_geo()
	{
		$this->db->select('	asWkb(app_rw_jakarta.SHAPE) as wkb,  
							app_rw_jakarta.kab_name as nama_kodya,
							app_rw_jakarta.kec_name as nama_kecamatan,
							app_rw_jakarta.kel_name as nama_kelurahan, 
							app_rw_jakarta.OGR_FID');
		$this->db->from('app_rw_jakarta');
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

}

/* End of file model_rw.php */
/* Location: ./application/models/model_rw.php */