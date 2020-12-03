<script>
import { uniq } from 'lodash';
import { TAG_SEPARATOR } from '@/common/constants';
import { getTagsArrayFromString } from '@/common/helpers';

export default {
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  computed: {
    splitTags() {
      /* Note: split tags string into array by separator
      and remove empty strings */
      return getTagsArrayFromString(this.tags);
    }
  },
  watch: {
    async splitTags(value) {
      if (!value.length) {
        this.clearContent();
      } else {
        Array.from(this.$refs.analyzer.children)
          .slice(0, value.length)
          .forEach((element, index) => {
            element.textContent = `#${value[index]}`;
          });
      }
    }
  },
  methods: {
    async updateTags(tags) {
      this.$emit('setTags', tags);
      this.$refs.analyzer.blur();
    },
    clearContent() {
      this.$refs.analyzer.textContent = '';
    }
  },
  render(createElement) {
    const elements = this.splitTags.map(tag => {
      return createElement(
        'span',
        {
          class: { tag: true }
        },
        `#${tag}`
      );
    });

    const updateTags = event => {
      // Note: remove duplicates
      const uniqValues = uniq(
        event.target.textContent
          .split(TAG_SEPARATOR)
      );
      this.updateTags(uniqValues.join(TAG_SEPARATOR));
    };

    return createElement(
      'div',
      {
        attrs: { contentEditable: true },
        class: {
          analyzer: true
        },
        style: {
          outline: 'none',
          minHeight: '42px'
        },
        on: {
          blur: event => updateTags(event),
          keydown: event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              updateTags(event);
            }
          }
        },
        ref: 'analyzer'
      },
      elements
    );
  }
};
</script>

<style lang="scss" scoped>
.tag, .analyzer::v-deep font {
  display: inline-flex;
  background-color: $blue-gray-100;
  border-radius: 10px;
  color: $gray-900;
  padding: 4px 8px;
  @include r-s10-h12;
  margin: 2px;
}
</style>
