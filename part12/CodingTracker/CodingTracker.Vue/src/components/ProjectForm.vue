<script setup lang="ts">
import {ref} from "vue";
import type {ProjectDto, ProjectFormEmits} from '../types';

const formData = ref<ProjectDto>({} as ProjectDto);
const emit = defineEmits<ProjectFormEmits>();

const handleSubmit = async () => {
  emit('onCreateProject', formData.value);
  formData.value = {} as ProjectDto;
}
</script>

<template>
<div>
  <h2 class="mb-3">Project Form</h2>
  <div class="row">
    <div class="col-md-6">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="projectName" class="form-label">Project Name</label>
          <input type="text" class="form-control" id="projectName" placeholder="Enter project name" v-model="formData.name" required/>
        </div>
        <div class="mb-3">
          <label for="projectDescription" class="form-label">Project Description</label>
          <textarea class="form-control" id="projectDescription" rows="3" placeholder="Enter project description" v-model="formData.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">Start Date</label>
          <input type="date" class="form-control" id="startDate" v-model="formData.startDate" required/>
        </div>
        <div class="mb-3">
          <label for="endDate" class="form-label">End Date</label>
          <input type="date" class="form-control" id="endDate" v-model="formData.endDate" required/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
