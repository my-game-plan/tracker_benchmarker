import {Ref} from 'vue';

export async function getBenchmark(tracker_id: string, status: Ref<string>, isLoading: Ref<boolean>, url: string) {
    isLoading.value = true
    const endpoint = `${url}/trackers/${tracker_id}/benchmark`

    const eventSource = new EventSource(endpoint);

    eventSource.onmessage = function(event) {
        status.value = event.data

        // This assumes that the backend sends the URL for the file download as the last message
        if(event.data.startsWith("http")) {
            downloadCSV(event.data);
            eventSource.close();
            isLoading.value = false
        }
    };

    eventSource.onerror = function(error) {
        console.log("Failed to connect to event source", error);
        eventSource.close();
    };
}

function downloadCSV(dataUrl: string) {
    fetch(dataUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const tmp_url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = tmp_url;
            link.setAttribute('download', 'tracker_benchmark.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => console.error('Error:', error));
}
