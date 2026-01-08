<?php

namespace App\Entity\Trait;

use App\Api\Crm\Cms\Dto\IDto;

trait UpdateFromDtoTrait {

    public function updateFromDto(IDto $dto) {

        foreach(get_class_vars(self::class) as $key => $value){
            $this->$key = isset($dto->$key) ?  $dto->$key : $value;
        }
    }
}