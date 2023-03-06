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

export function persist(element: HTMLElement, config: PersistConfig) {
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

    load_cached_values(element, _store, {
        ignorePassword: _config.ignorePassword
    })

    element.addEventListener(_config.persistOn, handler);

    return {
        destroy() {
            element.removeEventListener(_config.persistOn, handler);
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

const load_cached_values = (element: HTMLElement, store: Writable<any>, config: {
    ignorePassword: boolean
}) => {
    for (const [key, value] of Object.entries(get(store))) {
        if (element.attributes.getNamedItem('name')?.value === key) {
            load_data(element, value, config)
        }
        const inputs = element.querySelectorAll(`[name="${key}"]`)
        for (const input of inputs) {
            load_data(input, value, config);
        }
    }
}

function load_data(element: Element, value: unknown, config: { ignorePassword: boolean; }) {
    if (element instanceof HTMLInputElement) {
        if (element.type === 'radio') {
            element.checked = element.value === value;
        }
        else if (element.type === 'checkbox') {
            element.checked = value as boolean;
        } else if (element.type === 'password' && !config.ignorePassword) {
            element.value = value as string;
        } else {
            element.value = value as string;
        }
    } else if (element instanceof HTMLTextAreaElement) {
        element.value = value as string;
    } else if (element instanceof HTMLSelectElement) {
        element.selectedIndex = value as number;
    }
}
