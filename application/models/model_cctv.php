<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_cctv extends CI_Model {

	public function get_cctv_balitower($id_cctv = false)
	{
		$this->db->select('*');
		$this->db->from('app_poi_cctv_balitower');
		if ($id_cctv != false) {
			$this->db->where('cctv_id', $id_cctv);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

	public function get_cctv_balitower_terdekat($lat, $long)
	{
		$this->db->select('*, SQRT( POW( 69.1 * ( app_poi_cctv_balitower.lat - '.$lat.') , 2 ) + POW( 69.1 * ( '.$long.' - app_poi_cctv_balitower.long ) * COS( app_poi_cctv_balitower.lat / 57.3 ) , 2 ) ) AS distance', false);
		$this->db->from('app_poi_cctv_balitower');
		$this->db->order_by('distance', 'ASC');
		$this->db->limit(30);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

}

/* End of file model_cctv.php */
/* Location: ./application/models/model_cctv.php */