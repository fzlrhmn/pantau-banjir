<?php 
	/**
	* 
	*/
	class Csvtojson
	{

		/**
		 * Function to convert CSV into associative array
		 *
		 * @return array
		 * @author 
		 **/
		private function csvToArray($file, $delimiter) { 
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

		/**
		 * Get CSV from google docs and convert it to associative array
		 *
		 * @return array
		 * @author 
		 **/
		public function csv_to_json($feed)
		{
			// Set your CSV feed
			//$feed = 'https://docs.google.com/spreadsheets/d/1K4Q8CJc0Lbr7p-R50QQD8UYlCwZ6XPdC8jlf3y1CbC4/pub?gid=1690435514&single=true&output=csv';

			// Arrays we'll use later
			$keys = array();
			$newArray = array();

			// Do it
			$data = $this->csvToArray($feed, ',');

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
	}

?>