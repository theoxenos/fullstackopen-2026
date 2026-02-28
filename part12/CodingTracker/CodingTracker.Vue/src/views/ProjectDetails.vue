<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";
import {API_URL} from "@/config";
import type {Project} from "@/types.ts";

const route = useRoute();
const projectId = route.params.id;

const newSession = ref({
  startTime: '',
  endTime: '',
  projectId
});
const project = ref<Project>(null!);

const getTimeDifference = (date1: Date, date2: Date) => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());

  const days = Math.floor(diffInMs / 86400000);
  const hours = Math.floor((diffInMs % 86400000) / 3600000);
  const minutes = Math.floor((diffInMs % 3600000) / 60000);
  const seconds = Math.floor((diffInMs % 60000) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const toDateTimeLocal = (value: string) => {
  if (!value) return "";

  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const handleSessionSubmit = async () => {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSession.value),
  });
  if (!response.ok) {
    throw new Error('Failed to create session');
  }

  const sessionData = await response.json();
  project.value.sessions.push(sessionData);
  newSession.value = {
    startTime: '',
    endTime: '',
    projectId
  };
}

onMounted(async () => {
  const response = await fetch(`${API_URL}/projects/${projectId}`);
  project.value = await response.json();
});

onUnmounted(() => {
  console.log('ProjectDetails component unmounted');
});

</script>

<template>
  <h1>Project Details</h1>
  <div class="mb-5">
    <p v-if="project">Project Name: {{ project?.name }}</p>
    <p v-if="project">Project Description: {{ project?.description }}</p>
    <p v-if="project">Project Start Date: {{
        new Date(project?.startDate).toLocaleDateString()
      }}</p>
    <p v-if="project">Project End Date: {{ new Date(project?.endDate).toLocaleDateString() }}</p>
  </div>

  <template v-if="project">
    <h2>Sessions</h2>
    <table class="table mb-5">
      <thead>
      <tr>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Duration</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="project.sessions.length > 0">
        <tr v-for="session in project?.sessions" :key="session.id">
          <td>{{ toDateTimeLocal(session.startTime) }}</td>
          <td>{{ toDateTimeLocal(session.endTime) }}</td>
          <td>{{ getTimeDifference(new Date(session.startTime), new Date(session.endTime)) }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="3">No sessions found for this project.</td>
        </tr>
      </template>
      </tbody>
    </table>
    <div class="w-25">
      <h2>Add New Session</h2>
      <form @submit.prevent="handleSessionSubmit">
        <div class="mb-3">
          <label for="startTime" class="form-label">Start Time</label>
          <input id="startTime" type="datetime-local" class="form-control"
                 v-model="newSession.startTime" required/>
        </div>
        <div class="mb-3">
          <label for="endTime" class="form-label">End Time</label>
          <input id="endTime" type="datetime-local" class="form-control"
                 v-model="newSession.endTime" required/>
        </div>
        <div>
          <button type="button" class="btn btn-secondary me-2" @click="$router.push('/')">Go back
          </button>
          <button type="submit" class="btn btn-success">Add Session</button>
        </div>
      </form>
    </div>
  </template>
  <template v-else>
    <p>Loading...</p>
  </template>
</template>
