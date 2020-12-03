<template>
  <TaskCardCreator />
</template>

<script>
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import middlewares from '@/middlewares';

export default {
  name: 'TaskCreate',
  layout: 'AppLayoutDefault',
  middlewares: { auth: middlewares.AUTH },
  components: {
    TaskCardCreator
  }
};
</script>
