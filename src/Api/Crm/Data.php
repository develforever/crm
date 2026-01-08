<?php

namespace App\Api\Crm;

use JsonSerializable;
use RuntimeException;

class Data implements IData, JsonSerializable
{


    public $error = null;
    public $data = null;
    public $meta = null;
    public $message = null;

    public function getData()
    {
        return [
            'error' => $this->error,
            'data' => $this->data,
            'meta' => $this->meta,
            'message' => $this->message,
        ];
    }

    public function __toString()
    {
        return json_encode($this->getData());
    }

    public function jsonSerialize(): mixed
    {
        return $this->getData();
    }
}
