<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Flood extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_store');
		$this->load->model('model_kelurahan');
		$this->load->model('model_flood');
	}

	public function index()
	{
		$this->load->view('maps/maps');
	}

	public function geo_qlue()
	{
		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		$data['kelurahan'] 		= $this->model_kelurahan->get_kelurahan_geo();
		$data['report_qlue'] 	= $this->model_flood->get_flood();

		foreach ($data['kelurahan'] as $item) {
			$properties = $item;
			$data_banjir 					= $this->model_kelurahan->get_flood_kelurahan($data['report_qlue'], $item['nama_kelurahan']);
			$properties['flood_average']	= $this->model_flood->get_flood_average($data_banjir);
			$properties['flood_max']		= $this->model_flood->get_flood_max($data_banjir);
			$properties['flood_color']		= $this->model_flood->get_flood_color($properties['flood_average']);
			$properties['banjir']			= $data_banjir;
			unset($properties['wkb']);

			$feature = array(
		         'type' => 'Feature',
		         'properties' => $properties,
		         'geometry' => json_decode($this->geophp->wkb_to_json($item['wkb']))
		    );
		    # Add feature arrays to feature collection array
		    array_push($geojson['features'], $feature);
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($geojson));
	}

	public function geo_bpbd($fromTime = false, $toTime = false)
	{
		$data = $this->model_flood->get_bpbd_json();
		$resultData = json_decode($data);

		$this->output->set_content_type('application/json')->set_output(json_encode($resultData));
	}
}

/* End of file flood.php */
/* Location: ./application/controllers/flood.php */