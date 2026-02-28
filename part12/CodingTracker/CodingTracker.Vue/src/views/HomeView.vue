<script setup lang="ts">
import ProjectForm from '../components/ProjectForm.vue'
import ProjectList from '../components/ProjectList.vue'
import {API_URL} from "@/config";
import {onMounted, ref} from "vue";
import type {Project, ProjectDto} from "@/types.ts";

const projects = ref<Project[]>([]);

const handleProjectCreate = async (project: ProjectDto) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  if(!response.ok) {
    throw new Error('Failed to create project');
  }
  projects.value.push(await response.json() as Project);
}

onMounted(async () => {
  const response = await fetch(`${API_URL}/projects`);
  if(!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  projects.value = await response.json();
})
</script>

<template>
  <div class="d-flex flex-column gap-5">
    <ProjectForm @onCreateProject="handleProjectCreate"/>
    <ProjectList :projects="projects"/>
  </div>
</template>
