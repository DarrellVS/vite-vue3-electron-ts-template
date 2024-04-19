<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog'
import { PhTag } from '@phosphor-icons/vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { tagColors } from '../../../constants/tag-colors';
import BaseCombobox from '@/components/base/BaseCombobox.vue'
import BaseInput from '../base/input/BaseInput.vue';
import BaseInputText from '../base/input/BaseInputText.vue';
import { useElectron } from '@/composables/UseElectron';
import { type Tag } from '../../../types/stores';

const { emit: electronEmit } = useElectron()

const properties = defineProps<{
  existingTags?: Tag[];
}>()

const emit = defineEmits<{
  (eventName: 'close'): void
}>()

const parentOptions = computed(() => (properties.existingTags ?? []).map((tag) => {
  const color = tagColors.find((color) => color.id === tag.colorOption)
  
  return {
    value: tag.id,
    label: tag.name,
    badgeColor: color?.bg ?? '',
    textColor: color?.text ?? '',
  }
}) || [])

const bgOptions = tagColors.map((color) => ({
  value: color.id,
  label: color.name,
  badgeColor: color.bg,
  textColor: color.text,
}))

const form = ref<{
  parentTag: string;
  colorOption: number;
  name: string;
}>({
  parentTag: '',
  colorOption: 1,
  name: '',
})

const submit = async () => {
  await electronEmit('tags_createTag', {
    ...form.value,
  });

  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="bg-white">
      <DialogHeader>
        <DialogTitle>
          <div class="flex items-center">
            <div class="p-3 mr-4 rounded-lg bg-blue-100 text-blue-600">
              <PhTag weight="fill"/>
            </div>

            <span>
              Create tag
            </span>
          </div>
        </DialogTitle>
      </DialogHeader>

      <BaseInput v-if="existingTags && existingTags.length > 0">
        <template #label>
          Parent tag
        </template>
        <BaseCombobox 
          v-model="form.parentTag"
          :options="parentOptions"
        />
      </BaseInput>

      <BaseInput>
        <template #label>
          Tag color
        </template>
        <BaseCombobox 
          v-model="form.colorOption"
          :options="bgOptions"
        />
      </BaseInput>

      <BaseInput>
        <template #label>
          Tag name
        </template>
        <BaseInputText 
          v-model="form.name"
          placeholder="Enter a name for your tag..."
        />
      </BaseInput>

      <DialogFooter>
        <BaseButton variant="tertiary">
          Close
        </BaseButton>
        <BaseButton @click="submit">
          Save
        </BaseButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>