<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kelurahan extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_store');
		$this->load->model('model_kelurahan');
		$this->load->model('model_flood');
	}

	public function index()
	{
		$data['kelurahan'] = $this->model_kelurahan->get_kelurahan();
		$this->output->set_content_type('application/json')->set_output(json_encode($data));
	}

	

}

/* End of file kelurahan.php */
/* Location: ./application/controllers/kelurahan.php */