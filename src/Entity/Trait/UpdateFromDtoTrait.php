<?php

namespace App\Entity\Trait;

use App\Api\IDto;

trait UpdateFromDtoTrait
{


    public function updateFromDto(IDto $dto): void
    {
        
        foreach (get_object_vars($dto) as $property => $value) {
            
            if ($value !== null) {
                $setter = 'set' . ucfirst($property);
                if (method_exists($this, $setter)) {
                    $this->$setter($value);
                } elseif (property_exists($this, $property)) {
                    $this->{$property} = $value;
                }
            }
        }
    }

}
