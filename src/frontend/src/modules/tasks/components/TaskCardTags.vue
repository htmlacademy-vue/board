<template>
  <ul class="task__tags">
    <li
      v-for="(tag, index) in tagsArray"
      :key="index"
    >
      <span class="task__tag">
        {{ tag }}
      </span>
    </li>
  </ul>
</template>

<script>

import { getTagsArrayFromString } from '@/common/helpers';

export default {
  name: 'TaskCardTags',
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  computed: {
    tagsArray() {
      return getTagsArrayFromString(this.tags);
    }
  }
};

</script>

<style lang="scss" scoped>

.task__tags {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin-top: 5px;

  li {
    margin-top: 4px;
    margin-right: 4px;
  }
}

.task__tag {
  background-color: $blue-gray-100;
  border-radius: 10px;
  color: $black-900;
  padding: 4px 8px;
  @include r-s10-h12;
}
</style>
