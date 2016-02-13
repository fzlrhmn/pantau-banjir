<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_flood extends CI_Model {

	private function set_qlue_flood()
	{
		// $this->db->insert_batch('alerts', $data);
	}

	public function dateFilter($array_report, $dateStart = false, $dateEnd = false)
	{
		if ( count($array_report) != 0 ) {
			$flood_array = array();
			for ($i=0; $i < count($array_report); $i++) { 
				if ( $dateStart != false ) {
					if ( ($array_report[$i]['date'] >= $dateStart) && ($array_report[$i]['date'] <= $dateEnd) ) {
						array_push($flood_array, $array_report[$i]);
					}
				}
			}
		}

		return $flood_array;
	}

	public function get_value_qlue_flood($array_report)
	{
		$flood_array = array();
		for ($i=0; $i < count($array_report); $i++) { 
			array_push($flood_array, $array_report[$i]['kelurahan']);
		}
		return $flood_array;
	}

	public function get_value_bpbd_flood($flood_array)
	{
		if (count($flood_array) != 0) {
			$flood_district = array();
			for ($i=0; $i < count($flood_array); $i++) { 
				if ( $flood_array[$i]->KETINGGIAN != 0 ) {
					array_push($flood_district, $flood_array[$i]->ID_DISTRIK);
				}
			}
		}
		else{
			$flood_district = 0;
		}
		return $flood_district;
	}

	public function get_flood_average($flood_array)
	{
		if (count($flood_array) != 0) {
			$flood_number = array();
			for ($i=0; $i < count($flood_array); $i++) { 
				array_push($flood_number, $flood_array[$i]['tinggi_genangan']);
			}
			$count = array_sum($flood_number) / count($flood_number);	
			
			$average_flood = round($count, 2);
		}
		else{
			$average_flood = 0;
		}
		return $average_flood;
	}

	public function get_flood_max($flood_array)
	{
		if (count($flood_array) != 0) {
			$flood_number = array();
			for ($i=0; $i < count($flood_array); $i++) { 
				array_push($flood_number, $flood_array[$i]['tinggi_genangan']);
			}
			$max_flood = max($flood_number);	
		}
		else{
			$max_flood = 0;
		}
		return $max_flood;
	}

	public function get_flood_color($average_flood)
	{
		$flood_color = null;
		
		if ($average_flood <= 10 ) {
			$flood_color = '#fffff';
		}
		elseif ( $average_flood > 10 && $average_flood <= 30 ) {
			$flood_color = '#bdc9e1';
		}
		elseif ( $average_flood > 30 && $average_flood <= 70 ) {
			$flood_color = '#74a9cf';
		}
		elseif ( $average_flood > 70 && $average_flood <= 100 ) {
			$flood_color = '#2b8cbe';
		}
		elseif ( $average_flood >= 100 ) {
			$flood_color = '#045a8d';
		}
		return $flood_color;
	}

	public function get_flood_bpbd($array_report, $id_rw)
	{
		$rw_flood = array();
		for ($i=0; $i < count($array_report); $i++) { 
			if ($array_report[$i]->ID_DISTRIK == $id_rw) {
				if ($array_report[$i]->KETINGGIAN > 0) {
					array_push($rw_flood, $array_report[$i]);	
				}
			}
		}

		return $rw_flood;
	}

	public function get_bpbd_flood_average($flood_array)
	{
		if (count($flood_array) != 0) {
			$flood_number = array();
			for ($i=0; $i < count($flood_array); $i++) { 
				if ( $flood_array[$i]->KETINGGIAN != 0 ) {
					array_push($flood_number, $flood_array[$i]->KETINGGIAN);
				}
			}
			$count = array_sum($flood_number) / count($flood_number);	
			
			$average_flood = round($count, 2);
		}
		else{
			$average_flood = 0;
		}
		return $average_flood;
	}

	public function get_bpbd_flood_max($flood_array)
	{
		if (count($flood_array) != 0) {
			$flood_number = array();
			for ($i=0; $i < count($flood_array); $i++) { 
				if ( $flood_array[$i]->KETINGGIAN != 0 ) {
					array_push($flood_number, $flood_array[$i]->KETINGGIAN);
				}
			}
			$max_flood = max($flood_number);
		}
		else{
			$max_flood = 0;
		}
		return $max_flood;
	}

	public function get_bpbd_json()
	{
		$bpbd_date_start 	= str_replace('-', '', $this->input->get('datestart'));
		$bpbd_date_end 		= str_replace('-', '', $this->input->get('dateend'));

		try {
			$data = $this->curl->simple_get('http://bpbd.jakarta.go.id/cgi-bin/flr?fromTime='.$bpbd_date_start.'0000&toTime='.$bpbd_date_end.'2359');	
		} catch (Exception $e) {
			$data = $e->getMessage();
		}
		return json_decode($data);
	}
}

/* End of file model_flood.php */
/* Location: ./application/models/model_flood.php */