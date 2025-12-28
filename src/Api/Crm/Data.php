<?php

namespace App\Api\Crm;

use JsonSerializable;

class Data implements IData, JsonSerializable
{

    private $_data = [
        'error' => null,
        'data' => null,
        'meta' => null,
    ];

    public function __set(string $name, $value)
    {
        $this->_data[$name] = $value;
    }

    public function getData()
    {
        return $this->_data;
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
