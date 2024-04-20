<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/ui/popover'

type ValueType<T> = T | T[];
type AcceptedTypes = number | string;
type AcceptedValuesType = ValueType<AcceptedTypes>

const properties = defineProps<{
    modelValue: AcceptedValuesType
    options: { value: AcceptedTypes; label: string; badgeColor?: string; textColor?: string;  }[]
}>()

const emit = defineEmits<{
    (eventName: 'update:modelValue', value: AcceptedValuesType): void
}>()

const multiple = computed(() => Array.isArray(properties.modelValue))

const query = ref('');

const isSelected = (value: AcceptedTypes) => {
    if (multiple.value && Array.isArray(properties.modelValue)) {
        return properties.modelValue.includes(value)
    }

    return properties.modelValue === value
}

const toggleSelected = (value: AcceptedTypes) => {
    if (multiple.value && Array.isArray(properties.modelValue)) {
        const index = properties.modelValue.indexOf(value)

        if (index === -1) {
            emit('update:modelValue', [...properties.modelValue, value])
        } else {
            emit('update:modelValue', [
                ...properties.modelValue.slice(0, index),
                ...properties.modelValue.slice(index + 1),
            ])
        }
    } else {
        emit('update:modelValue', properties.modelValue === value ? '' : value)
    }
}

const optionBadges = computed(() => {
    return properties.options
        .filter(option => isSelected(option.value))
        .map((option) => ({
            ...option,
            badgeColor: option.badgeColor || 'bg-gray-200',
            textColor: option.textColor || 'text-gray-700',
        }));
})

const filteredOptions = computed(() => {
    return properties.options.filter((option) => {
        return option.label.toLowerCase().includes(query.value.toLowerCase())
    })
})

const open = ref(false)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        role="combobox"
        :aria-expanded="open"
        class="w-[300px] justify-between border border-gray-400 h-auto min-h-[2.75rem]"
      >
        <template v-if="Array.isArray(modelValue) && multiple">
            <div v-if="optionBadges.length > 0" class="flex flex-wrap gap-1">
                <Badge 
                    v-for="option in optionBadges"
                    :key="option.value"
                    variant="secondary"
                    :class="[
                        option.textColor,
                        option.badgeColor,
                    ]"
                >
                    {{ option.label }}
                </Badge>
            </div>
            <span v-else>
                Select options...
            </span>
        </template>
        <template v-else-if="optionBadges.length === 1">
            <Badge 
                v-if="optionBadges[0].badgeColor"
                variant="secondary"
                :class="[
                    optionBadges[0].textColor,
                    optionBadges[0].badgeColor,
                ]"
            >
                {{ optionBadges[0].label }}
            </Badge>
            <span v-else>
                {{ optionBadges[0].label }}
            </span>
        </template>
        <span v-else>
            Select option...
        </span>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0 rounded-lg dark:bg-slate-900 bg-white">
      <Command v-model:search-term="query">
        <CommandInput class="h-9" placeholder="Search option..." />
        <CommandEmpty>No option found.</CommandEmpty>
        <CommandList>
          <CommandGroup class="p-0">
            <CommandItem
              v-for="option in filteredOptions"
              :key="option.value"
              :value="option.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string' || typeof ev.detail.value === 'number') {
                    toggleSelected(ev.detail.value)
                }

                if (!multiple) {
                    open = false
                }
              }"
              class="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 px-4 py-2 cursor-pointer flex items-center capitalize"
            >
              {{ option.label }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  isSelected(option.value) ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>