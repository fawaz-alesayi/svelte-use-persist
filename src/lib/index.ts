import type { Writable } from "svelte/store";
import { persisted } from 'svelte-local-storage-store'
import { get } from 'svelte/store';

export function persist(node: HTMLElement, {
    store,
    key,
    persistOn,
}: {
    store?: Writable<any>,

    /**
     * the key to use for the local storage
     *  */
    key?: string,

    /**
     * the event to listen to for persisting the form state
     * 
     * @default 'input'
     * */
    persistOn: 'input' | 'change'
} = {
        persistOn: 'input'
    }) {
    const _key = key || node.id
    const _store = store || persisted(_key, {})
    const load_cached_values = (store: Writable<any>) => {
        for (const [key, value] of Object.entries(get(store))) {
            const inputs = node.querySelectorAll(`[name="${key}"]`)
            for (const input of inputs) {
                if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
                    if (input instanceof HTMLInputElement && input.type === 'radio') {
                        input.checked = input.value === value
                    } else if (input instanceof HTMLSelectElement) {
                        input.selectedIndex = value as number
                    } else {
                        // @ts-ignore
                        input.value = value
                    }
                }
            }
        }
    }

    load_cached_values(_store)

    function save_form_state(event: Event, store: Writable<any>) {
        const input = event.target as HTMLInputElement
        const value = get(store)
        if (input instanceof HTMLSelectElement) {
            store.set({ ...value, [input.name]: input.selectedIndex })
        } else if (input instanceof HTMLInputElement) {
            store.set({ ...value, [input.name]: input.value })
        }
    }

    function handler(event: Event) {
        save_form_state(event, _store)
    }


    node.addEventListener(persistOn, handler);

    return {
        destroy() {
            node.removeEventListener('input', handler);
        },
        update() { }
    }
}