<?php

namespace App\Api;

final class DtoApplier
{
    public function apply(object $dto, object $entity): void
    {
        $ref = new \ReflectionObject($dto);
        foreach ($ref->getProperties() as $prop) {
            $value = $prop->getValue($dto);
            if ($value === null) {
                continue;
            }
            $name = $prop->getName();
            $setter = 'set' . ucfirst($name);
            if (method_exists($entity, $setter)) {
                $entity->$setter($value);
            }
        }
    }
}
