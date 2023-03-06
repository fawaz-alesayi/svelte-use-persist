import type { Writable } from "svelte/store";
import { persisted } from 'svelte-local-storage-store'
import { get } from 'svelte/store';

type BasePersistConfig = {
    /**
     * the event to listen to for persisting the form state
     * 
     * @default 'input'
     * */
    persistOn?: 'input' | 'change',

    /**
     * Setting this to `false` will cause the password fields to be persisted. Highly discouraged.
     * 
     * This is a massive security risk, only use this if you know what you are doing.
    *
    * @default true
    * */
    ignorePassword?: boolean
}

type PersistConfigWithKey = BasePersistConfig & {
    key: string
}

type PersistConfigWithStore = BasePersistConfig & {
    store: Writable<any>
}
type PersistConfig = PersistConfigWithKey | PersistConfigWithStore

export function persist(node: HTMLElement, config: PersistConfig) {
    const _config = {
        persistOn: 'input',
        ignorePassword: true,
        ...config
    }

    let _store: Writable<any>
    if ('key' in _config) {
        _store = persisted(_config.key, {})
    } else {
        _store = _config.store
    }

    function handler(event: Event) {
        save_input(event, _store, {
            ignorePassword: _config.ignorePassword
        })
    }

    load_cached_values(node, _store, {
        ignorePassword: _config.ignorePassword
    })

    node.addEventListener(_config.persistOn, handler);

    return {
        destroy() {
            node.removeEventListener(_config.persistOn, handler);
        },
    }
}

function save_input(event: Event, store: Writable<any>, config: {
    ignorePassword: boolean
}) {
    const input = event.target
    const value = get(store)
    if (input instanceof HTMLSelectElement) {
        store.set({ ...value, [input.name]: input.selectedIndex })
    } else if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        if (input.type === 'password' && config.ignorePassword) {
            return
        }
        store.set({ ...value, [input.name]: input.value })
    }
}

const load_cached_values = (node: HTMLElement, store: Writable<any>, config: {
    ignorePassword: boolean
}) => {
    for (const [key, value] of Object.entries(get(store))) {
        const inputs = node.querySelectorAll(`[name="${key}"]`)
        for (const input of inputs) {
            if (input instanceof HTMLInputElement) {
                console.log(input, "is a HTMLInputElement")
                if (input.type === 'radio') {
                    input.checked = input.value === value
                } else if (input.type === 'password' && !config.ignorePassword) {
                    input.value = value as string
                }
            } else if (input instanceof HTMLTextAreaElement) {
                input.value = value as string
            } else if (input instanceof HTMLSelectElement) {
                input.selectedIndex = value as number
            }
        }
    }
}