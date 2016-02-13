<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_rw extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_rw_geo($where_array = false)
	{
		$this->db->select('	asWkb(app_rw_jakarta.SHAPE) as wkb,
							asText(centroid(app_rw_jakarta.SHAPE)) as center_point,
							x(centroid(app_rw_jakarta.SHAPE)) as x,
							y(centroid(app_rw_jakarta.SHAPE)) as y,
							app_rw_jakarta.kab_name as nama_kodya,
							app_rw_jakarta.kec_name as nama_kecamatan,
							app_rw_jakarta.kel_name as nama_kelurahan, 
							app_rw_jakarta.rw as rw, 
							app_rw_jakarta.id');
		$this->db->from('app_rw_jakarta');
		if ($where_array != false) {
			$this->db->where_in('id', $where_array);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

}

/* End of file model_rw.php */
/* Location: ./application/models/model_rw.php */