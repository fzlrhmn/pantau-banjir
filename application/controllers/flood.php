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

	/*
	 Routes : geo/qlue
	 */

	public function geo_qlue()
	{
		$qlue_feed = "https://docs.google.com/spreadsheets/d/1ZOdy3j2FVkhLBMI_aDKoU3BV5qurI6hsPKHZHNmzoNA/pub?gid=0&single=true&output=csv";
		
		$qlue_date_start 	= str_replace('', '', $this->input->get('datestart'));
		$qlue_date_end 		= str_replace('', '', $this->input->get('dateend'));
		# Build GeoJSON feature collection array
		$geojson = array(
			'datestart' => $qlue_date_start,
			'dateend' => $qlue_date_end,
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		$qlue_json 				= $this->csvtojson->csv_to_json($qlue_feed);
		$data['report_qlue']	= $this->model_flood->dateFilter($qlue_json, $qlue_date_start, $qlue_date_end);
		$get_kelurahan			= $this->model_flood->get_value_qlue_flood($data['report_qlue']);
		$unique_kelurahan		= array_unique($get_kelurahan);
		$data['kelurahan'] 		= $this->model_kelurahan->get_kelurahan_geo($unique_kelurahan);

		foreach ($data['kelurahan'] as $item) {
			$properties = $item;
			$data_banjir 					= $this->model_kelurahan->get_flood_kelurahan($data['report_qlue'], $item['nama_kelurahan']);
			$properties['flood_average']	= $this->model_flood->get_flood_average($data_banjir);
			$properties['flood_max']		= $this->model_flood->get_flood_max($data_banjir);
			$properties['state']			= $this->model_flood->get_state($properties['flood_average']);
			$properties['state_color']		= $this->model_flood->get_state_color($properties['flood_average']);
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

	/*
	 Routes : geo/bpbd
	 */
	public function geo_bpbd()
	{
		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		$reports 		= $this->model_flood->get_bpbd_json();
		
		// get only affected areas
		$get_rw			= $this->model_flood->get_value_bpbd_flood($reports->reports);
		$unique_rw		= array_unique($get_rw);
		$data['rw'] 	= $this->model_rw->get_rw_geo($unique_rw);

		foreach ($data['rw'] as $item) {
			$properties = $item;
			$data_banjir 					= $this->model_flood->get_flood_bpbd($reports->reports, $item['id']);
			$properties['flood_average']	= $this->model_flood->get_bpbd_flood_average($data_banjir);
			$properties['flood_max']		= $this->model_flood->get_bpbd_flood_max($data_banjir);
			$properties['state']			= $this->model_flood->get_state($properties['flood_average']);
			$properties['state_color']		= $this->model_flood->get_state_color($properties['flood_average']);
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

	public function geo_petajakarta()
	{
		$data = $this->model_flood->get_petajakarta_json();

		$features_array = array();
		for ($i=0; $i < count($data->features); $i++) { 
			if ( $data->features[$i]->properties->state != 0 ) {
				array_push($features_array, $data->features[$i]);
			}
		}

		$geojson = array(
		   'QueryTime'	=> $data->QueryTime,
		   'type'      	=> 'FeatureCollection',
		   'features'  	=> $features_array
		);

		$this->output->set_content_type('application/json')->set_output(json_encode($geojson));
	}
}

/* End of file flood.php */
/* Location: ./application/controllers/flood.php */