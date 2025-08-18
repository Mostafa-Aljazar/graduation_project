'use client';

import { useQuery } from '@tanstack/react-query';
import { DelegatesNamesResponse } from '@/@types/actors/general/delegates/delegatesResponse.type';
import { getDelegatesNames } from '@/actions/actors/delegates/names/getDelegatesNames';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';

interface Props {
  ids?: number[]; // Specific delegate IDs for DISPLAY mode
  mode: ACTION_ADD_EDIT_DISPLAY; // Mode to determine fetch behavior
}

export default function useGetDelegatesNames({ ids, mode }: Props) {
  const isDisplayMode = mode === ACTION_ADD_EDIT_DISPLAY.DISPLAY;
  const queryKey = isDisplayMode && ids ? ['delegatesNames', ids] : ['delegatesNames', 'all'];

  const {
    data: delegatedData,
    isLoading: isLoadingDelegated,
    error: queryDelegateError,
  } = useQuery<DelegatesNamesResponse, Error>({
    queryKey,
    queryFn: () => getDelegatesNames({ ids: isDisplayMode ? ids : undefined }),
    retry: 1,
    enabled: !!mode, // Ensure query runs only when mode is defined
  });

  const isLoading = isLoadingDelegated;
  const hasError = Boolean(queryDelegateError) || Boolean(delegatedData?.error);

  return {
    isLoading,
    hasError,
    delegatedData,
  };
}
