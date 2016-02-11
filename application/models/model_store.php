<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_store extends CI_Model {

    /**
     * @return get waze last json from teralogic
     */
    public function getJsonWaze()
	{	
		$data = $this->curl->simple_get('http://waze.terralogiq.net/feeder/last.json');	
		return json_decode($data);
	}

    /**
     * @return flood json from csv
     */
    public function getCsvFlood()
	{	
		$data = $this->curl->simple_get('https://docs.google.com/spreadsheets/d/1ZOdy3j2FVkhLBMI_aDKoU3BV5qurI6hsPKHZHNmzoNA/pub?gid=0&single=true&output=csv');	
		return json_decode($data);
	}

    /**
     * @param $url
     * @return mixed
     */
    public function getWazeData($url)
	{
		$data = $this->curl->simple_get($url);	
		return json_decode($data);
	}

    /**
     * @param $data
     */
    public function insertBatchData($data)
	{
		$this->db->insert_batch('alerts', $data);
	}

    /**
     * @return mixed
     */
    public function getLastTime()
	{
		$this->db->select('time as time');
		$this->db->order_by('id', 'desc');
		$this->db->from('alerts');
		$this->db->limit(1);
		$query = $this->db->get();
		$result = $query->row();
		return $result->time;
	}

    /**
     * @param $json
     * @return string
     */
    public function makeHashStringFromJson($json)
	{
        $json_hash = do_hash($json, 'md5');

        $object['hash'] = $json_hash;

        $this->db->insert('hash_store', $object);
		return $json_hash;
	}

    /**
     * @return mixed
     */
    public function checkLastHashStringFromJson()
    {
        $this->db->select('hash');
        $this->db->order_by('id', 'desc');
        $this->db->from('hash_store');
        $this->db->limit(1);
        $query = $this->db->get();
        $result = $query->row();
        return $result->hash;
    }

}

/* End of file model_store.php */
/* Location: ./application/models/model_store.php */