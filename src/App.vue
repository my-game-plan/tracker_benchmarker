<template>
    <div>
        <h1>Epic benchmark data creator</h1>
        <h2>Made with a lot of love for Berten ❤️️❤️️❤️️</h2>
        <label for="1">Id:</label>
        <input type="text" id="1" name="1" ref="i"><br><br>
        <button @click="onClick">Start</button>
        <h1>{{status}}</h1>
        <div style="width:480px" v-if="loading">
            <iframe allow="fullscreen" frameBorder="0" height="320"
                    src="https://giphy.com/embed/u2wg2uXJbHzkXkPphr/video" width="480"></iframe>
        </div>

        <h2>Settings</h2>
        <label for="1">Url</label>
        <input type="text" id="url" name="url" ref="url" value="https://mygameplan-api.herokuapp.com"><br><br>
    </div>
</template>

<script setup lang="ts">
import {getBenchmark} from './create_benchmark_data.ts';
import {ref} from 'vue';

const i = ref<HTMLInputElement>()
const url = ref<HTMLInputElement>()

const loading = ref(false)
const status = ref('')

async function onClick() {
    await getBenchmark(i.value!.value, status, loading, url.value!.value)
}
</script>

<style scoped>

</style>
