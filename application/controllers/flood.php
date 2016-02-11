<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Flood extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_store');
		$this->load->model('model_kelurahan');
		$this->load->model('model_rw');
		$this->load->model('model_flood');
	}

	public function index()
	{
		$this->load->view('maps/maps');
	}

	public function geo_qlue()
	{
		$qlue_feed = "https://docs.google.com/spreadsheets/d/1ZOdy3j2FVkhLBMI_aDKoU3BV5qurI6hsPKHZHNmzoNA/pub?gid=0&single=true&output=csv";
		
		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		$data['kelurahan'] 		= $this->model_kelurahan->get_kelurahan_geo();
		$data['report_qlue'] 	= $this->csvtojson->csv_to_json($qlue_feed);

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
		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		$data['rw'] 	= $this->model_rw->get_rw_geo();
		$reports 		= $this->model_flood->get_bpbd_json();

		foreach ($data['rw'] as $item) {
			$properties = $item;
			$data_banjir 					= $this->model_flood->get_flood_bpbd($reports->reports, $item['id']);
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
}

/* End of file flood.php */
/* Location: ./application/controllers/flood.php */