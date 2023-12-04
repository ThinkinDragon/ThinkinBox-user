import { useSessionStorage } from '@vueuse/core';
import { StorageSerializers } from '@vueuse/core';

export default async (url: string) => {
  try {
    if ( process.server) return;
  // Use sessionStorage to cache data
  const cached = useSessionStorage(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {

    

    const { data, error } = await useFetchAuth(url);
    console.log(error);
    console.log(data);

    if (error?.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }

    // Update the cache
    cached.value = data.value;
  } else {
    console.log(`Getting value from cache for ${url}`);
  }

  return cached;
        
} catch (error:any) {
  throw new Error(error,error);
  
  throw createError({
    statusMessage: `Could not fetch data from ${url}`,
  });
      return null;
}
};
