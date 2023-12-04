
<template>
    <carousel :items-to-show="1" :autoplay="5000" :wrapAround="true">
        <slide v-for="slide in images" :key="slide.id"
            class="flex flex-col items-start justify-center h-1/3 p-1 m-2 bg-gray-200 w-full md:w-80 rounded-2xl">
            <img class="p-2 h-1/3 w-full" style="max-height: 200px;;" :src="config.public.BASE_IMAGE_URL + slide.url" />
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
</template>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const config = useRuntimeConfig();
const props = defineProps(['images'])
const timer = ref(1000)
const currentIndex = ref(0)

const currentImg = computed(() => {
    props.images[Math.abs(currentIndex.value) % props.images.length];
})

onMounted(() => {
    console.log(props.images);

    startSlide()
});
function next() {
    currentIndex.value += 1
}
function startSlide() {
    timer.value = setInterval(next, 4000)
}

function prev() {
    currentIndex.value -= 1
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.9s ease;
    overflow: hidden;
    visibility: visible;
    position: absolute;
    width: 100%;
    opacity: 1;
}

.fade-enter,
.fade-leave-to {
    visibility: hidden;
    width: 100%;
    opacity: 0;
}

img {
    height: 600px;
    width: 100%
}

.prev,
.next {
    cursor: pointer;
    position: absolute;
    top: 40%;
    width: auto;
    padding: 16px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.7s ease;
    border-radius: 0 4px 4px 0;
}

.next {
    right: 0;
}

.prev {
    left: 0;
}

.prev:hover,
.next:hover {
    background-color: rgba(0, 0, 0, 0.9);
}
</style>
