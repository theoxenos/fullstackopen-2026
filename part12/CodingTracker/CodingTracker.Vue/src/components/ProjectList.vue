<script setup lang="ts">
import {RouterLink} from "vue-router";
import type {Project} from "@/types.ts";

defineProps<{ projects: Project[] }>();

const formatDescription: (description: string) => string = (description: string) => {
  if(description.length > 27) {
    return description.substring(0, 27) + '...';
  }
  return description;
}
</script>

<template>
<div>
  <h2 class="mb-3">Project List</h2>
  <table class="table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Details</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="project in projects" :key="project.id">
      <td>{{ project.name }}</td>
      <td>{{ formatDescription(project.description) }}</td>
      <td>{{ new Date(project.startDate).toLocaleDateString() }}</td>
      <td>{{ new Date(project.endDate).toLocaleDateString() }}</td>
      <td><RouterLink :to="{ name: 'ProjectDetails', params: { id: project.id } }">Details</RouterLink></td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>

</style>
