<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_petugas extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_petugas($id_user = false)
	{
		$this->db->select('nama, username, email, phone, status, lat, lng, login_terakhir, wilayah, alamat, jabatan, dinas, type, level, nir_nrk, gcm_key');
		$this->db->from('roam_userpetugas');
		$this->db->where('lat != ', '0.000000');
		$this->db->where('lng != ', '0.000000');
		if ($id_user != false) {
			$this->db->where('userid', $id_user);
		}
		$this->db->where('status', 0);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

	public function get_petugas_terdekat($lat, $long)
	{
		$this->db->select('*, SQRT( POW( 69.1 * ( lat - '.$lat.') , 2 ) + POW( 69.1 * ( '.$long.' - lng ) * COS( lat / 57.3 ) , 2 ) ) AS distance', false);
		$this->db->from('roam_userpetugas');
		$this->db->where('status', 0);
		// $this->db->where('type', 'kelurahan');
		$this->db->where('lat != ', '0.000000');
		$this->db->where('lng != ', '0.000000');
		$this->db->order_by('distance', 'ASC');
		$this->db->limit(30);
		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}

}

/* End of file model_petugas.php */
/* Location: ./application/models/model_petugas.php */
/*
SELECT *, SQRT( POW( 69.1 * ( lat - -6.181131) , 2 ) + POW( 69.1 * ( 106.828059 - lng ) * COS( lat / 57.3 ) , 2 ) ) AS distance FROM roam_userpetugas WHERE status = '0' AND type = 'dinas' AND lat != '0.000000' AND lng != '0.000000' ORDER BY distance ASC LIMIT 20
 */