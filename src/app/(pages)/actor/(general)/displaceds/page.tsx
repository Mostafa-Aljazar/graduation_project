'use client';
import Displaceds_List from '@/components/actors/general/Displaced/content/displaceds-list';
import { DESTINATION_DISPLACED } from '@/content/actor/displaced/filter';
import { useState } from 'react';

export default function Displaceds() {
  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    []
  );

  return (
    <Displaceds_List
      destination={DESTINATION_DISPLACED.DISPLACEDS}
      selectedDisplacedIds={selectedDisplacedIds}
      setSelectedDisplacedIds={setSelectedDisplacedIds}
      showAddButton={true}
    />
  );
}
