'use client';
import { DESTINATION_DISPLACED } from '@/@types/actors/common-types/index.type';
import Displaceds_List from '@/components/actors/general/displaceds/content/displaceds-list';
import { useState } from 'react';

export default function Displaceds() {
  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    []
  );

  return (
    <Displaceds_List
    // destination={DESTINATION_DISPLACED.DISPLACEDS}
    />
  );
}
