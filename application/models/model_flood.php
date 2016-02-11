<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_flood extends CI_Model {

	public function get_flood()
	{
		// Set your CSV feed
		$feed = "https://docs.google.com/spreadsheets/d/1ZOdy3j2FVkhLBMI_aDKoU3BV5qurI6hsPKHZHNmzoNA/pub?gid=0&single=true&output=csv";
		//$feed = 'https://docs.google.com/spreadsheets/d/1K4Q8CJc0Lbr7p-R50QQD8UYlCwZ6XPdC8jlf3y1CbC4/pub?gid=1690435514&single=true&output=csv';

		// Arrays we'll use later
		$keys = array();
		$newArray = array();

		// Function to convert CSV into associative array
		function csvToArray($file, $delimiter) { 
		  if (($handle = fopen($file, 'r')) !== FALSE) { 
		    $i = 0; 
		    while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) { 
		      for ($j = 0; $j < count($lineArray); $j++) { 
		        $arr[$i][$j] = $lineArray[$j]; 
		      } 
		      $i++; 
		    } 
		    fclose($handle); 
		  } 
		  return $arr; 
		} 

		// Do it
		$data = csvToArray($feed, ',');

		// Set number of elements (minus 1 because we shift off the first row)
		$count = count($data) - 1;
		  
		//Use first row for names  
		$labels = array_shift($data);  
		foreach ($labels as $label) {
		  $keys[] = $label;
		}

		// Add Ids, just in case we want them later
		$keys[] = 'id';
		for ($i = 0; $i < $count; $i++) {
		  $data[$i][] = $i;
		}
		  
		// Bring it all together
		for ($j = 0; $j < $count; $j++) {
		  $d = array_combine($keys, $data[$j]);
		  $newArray[$j] = $d;
		}

		// Print it out as JSON
		return $newArray;
	}

	private function set_flood()
	{
		// $this->db->insert_batch('alerts', $data);
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

	public function get_bpbd_json()
	{
		$data = $this->curl->simple_get('http://bpbd.jakarta.go.id/cgi-bin/flr?fromTime=201602110000&toTime=201602112359');
		return $data;
	}
}

/* End of file model_flood.php */
/* Location: ./application/models/model_flood.php */