<template>
    <div>
        <div class="drop-zone" 
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent>
          <div v-for="item in listOne" :key="item.title" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
            {{ item.title }}
          </div>
        </div>
        <div class="drop-zone"
        @drop="onDrop($event, 2)"
        @dragover.prevent
        @dragenter.prevent>
          <div v-for="item in listTwo" :key="item.title" class="drag-el"  
          draggable="true"
          @dragstart="startDrag($event, item)">
            {{ item.title }}
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">

export interface item {
    id: number
    title: string
    list: number
}

const props = defineProps({
    items: {
        type: Array<item>,
        default: [
            {
                id: 0,
                title: 'Item A',
                list: 1,
            },
            {
                id: 1,
                title: 'Item B',
                list: 1,
            },
            {
                id: 2,
                title: 'Item C',
                list: 2,
            },
        ],
    }
});

const listOne = computed(() =>
    {return props.items.filter((item) => item.list === 1)}
)
const listTwo = computed(() =>
    {return props.items.filter((item) => item.list === 2)}
)

function startDrag(evt, item: item) {
    console.log(item);
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)

    console.log(evt.dataTransfer);
}

function onDrop(evt, list: number) {
    const itemID = evt.dataTransfer.getData('itemID')
    console.log(itemID);
    
     props.items.forEach(element => {
        if (element.id == itemID) {
            element.list = list
        }
        console.log(element);
        return element
    });
}

async function test(params:any) {
    console.log(params);
    
}
</script>

<style scoped>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
  touch-action: none;
}
</style>