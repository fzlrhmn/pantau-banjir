<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_kelurahan extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_kelurahan_geo($where_array = false)
	{
		$this->db->select('	asWkb(app_border_kelurahan.SHAPE) as wkb,  
							app_border_kelurahan.name as nama_kelurahan, 
							app_border_kelurahan.OGR_FID');
		$this->db->from('app_border_kelurahan');
		if ($where_array != false) {
			$this->db->where_in('name', $where_array);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

	public function get_kelurahan()
	{
		$this->db->select('
							app_border_kelurahan.name as nama_kelurahan, 
							app_border_kelurahan.OGR_FID');
		$this->db->from('app_border_kelurahan');
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

	public function get_flood_kelurahan($array_report, $nama_kelurahan)
	{
		$kelurahan_flood = array();
		for ($i=0; $i < count($array_report); $i++) { 
			if ($array_report[$i]['kelurahan'] == $nama_kelurahan) {
				array_push($kelurahan_flood, $array_report[$i]);
			}
		}

		return $kelurahan_flood;
	}
}

/* End of file model_kelurahan.php */
/* Location: ./application/models/model_kelurahan.php */