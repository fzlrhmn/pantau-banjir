<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Petugas extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_store');
		$this->load->model('model_kelurahan');
		$this->load->model('model_flood');
		$this->load->model('model_petugas');
	}

	public function index($id_user = false)
	{
		$data = $this->model_petugas->get_petugas($id_user);
		for ($i = 0; $i < count($data); $i++) {
			$data[$i]['wkt'] = 'POINT('.$data[$i]['lng'].' '.$data[$i]['lat'].')';
		}

		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		foreach ($data as $item) {
			$properties = $item;

			unset($properties['wkt']);

			$feature = array(
		         'type' => 'Feature',
		         'properties' => $properties,
		         'geometry' => json_decode($this->geophp->wkt_to_json($item['wkt']))
		    );
		    # Add feature arrays to feature collection array
		    array_push($geojson['features'], $feature);
		}

		$this->output->set_content_type('application/json')->set_output(json_encode($geojson));
	}

	public function terdekat()
	{
		$lat 	= $this->input->get('lat');
		$long	= $this->input->get('long');

		$data = $this->model_petugas->get_petugas_terdekat($lat, $long);

		for ($i = 0; $i < count($data); $i++) {
			$data[$i]['wkt'] = 'POINT('.$data[$i]['lng'].' '.$data[$i]['lat'].')';
		}

		# Build GeoJSON feature collection array
		$geojson = array(
		   'type'      => 'FeatureCollection',
		   'features'  => array()
		);

		foreach ($data as $item) {
			$properties = $item;

			unset($properties['wkt']);

			$feature = array(
		         'type' => 'Feature',
		         'properties' => $properties,
		         'geometry' => json_decode($this->geophp->wkt_to_json($item['wkt']))
		    );
		    # Add feature arrays to feature collection array
		    array_push($geojson['features'], $feature);
		}

		$this->output->set_content_type('application/json')->set_output(json_encode($geojson));
	}

}

/* End of file petugas.php */
/* Location: ./application/controllers/petugas.php */