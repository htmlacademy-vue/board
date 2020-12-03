<template>
  <TaskCardView />
</template>

<script>
import TaskCardView from '@/modules/tasks/components/TaskCardView';

export default {
  name: 'TasksView',
  layout: 'AppLayoutMain',
  components: { TaskCardView }
};
</script>
