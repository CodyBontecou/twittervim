import { useMagicKeys, whenever } from '@vueuse/core'
import { computed, ref } from 'vue'

export interface TwitterKeyboardOptions {
  onNavigate?: (url: string) => void
  onInteraction?: (action: string) => void
  isCommandPaletteOpen?: () => boolean
}

export function useTwitterKeyboard(options: TwitterKeyboardOptions = {}) {
  const keys = useMagicKeys()
  const currentFocusedTweetIndex = ref(0)
  const isComposing = ref(false)

  // Navigation key combinations
  const g_h = computed(() => keys.g && keys.h)
  const g_e = computed(() => keys.g && keys.e)
  const g_n = computed(() => keys.g && keys.n)
  const g_m = computed(() => keys.g && keys.m)
  const g_k = computed(() => keys.g && keys.k)
  const g_p = computed(() => keys.g && keys.p)
  const g_l = computed(() => keys.g && keys.l)
  const g_b = computed(() => keys.g && keys.b)
  const g_c = computed(() => keys.g && keys.c)

  // Tweet interaction keys
  const { r, t, l, b, j, k, o, Escape, Meta, Control, Alt, Shift } = keys

  // Helper to check if user is typing in an input
  function isTyping() {
    // Check if command palette is open
    if (options.isCommandPaletteOpen?.()) {
      return true
    }

    const activeElement = document.activeElement
    return (
      activeElement?.tagName === 'INPUT'
      || activeElement?.tagName === 'TEXTAREA'
      || activeElement?.getAttribute('contenteditable') === 'true'
      || isComposing.value
    )
  }

  // Helper to check if any modifier keys are pressed
  function hasModifier() {
    return Meta.value || Control.value || Alt.value || Shift.value
  }

  // Navigation shortcuts
  whenever(g_h, () => {
    if (!isTyping()) {
      navigateTo('/home')
    }
  })

  whenever(g_e, () => {
    if (!isTyping()) {
      navigateTo('/explore')
    }
  })

  whenever(g_n, () => {
    if (!isTyping()) {
      navigateTo('/notifications')
    }
  })

  whenever(g_m, () => {
    if (!isTyping()) {
      navigateTo('/messages')
    }
  })

  whenever(g_k, () => {
    if (!isTyping()) {
      navigateTo('/i/grok')
    }
  })

  whenever(g_p, () => {
    if (!isTyping()) {
      const username = getUsernameFromPage()
      if (username) {
        navigateTo(`/${username}`)
      }
    }
  })

  whenever(g_l, () => {
    if (!isTyping()) {
      // Get username from the page
      const username = getUsernameFromPage()
      if (username) {
        navigateTo(`/${username}/lists`)
      }
    }
  })

  whenever(g_b, () => {
    if (!isTyping()) {
      navigateTo('/i/bookmarks')
    }
  })

  whenever(g_c, () => {
    if (!isTyping()) {
      const username = getUsernameFromPage()
      if (username) {
        navigateTo(`/${username}/communities`)
      }
    }
  })

  // Tweet interaction shortcuts
  whenever(j, () => {
    if (!isTyping() && !hasModifier()) {
      focusNextTweet()
    }
  })

  whenever(k, () => {
    if (!isTyping() && !hasModifier()) {
      focusPreviousTweet()
    }
  })

  whenever(r, () => {
    if (!isTyping() && !hasModifier()) {
      clickOnFocusedTweet('[data-testid="reply"]')
    }
  })

  whenever(t, () => {
    if (!isTyping() && !hasModifier()) {
      clickOnFocusedTweet('[data-testid="retweet"]')
    }
  })

  whenever(l, () => {
    if (!isTyping() && !hasModifier()) {
      clickOnFocusedTweet('[data-testid="like"]')
    }
  })

  whenever(b, () => {
    if (!isTyping() && !hasModifier()) {
      clickOnFocusedTweet('[data-testid="bookmark"]')
    }
  })

  whenever(o, () => {
    if (!isTyping() && !hasModifier()) {
      openFocusedTweet()
    }
  })

  whenever(Escape, () => {
    if (!hasModifier()) {
      removeFocusFromTweet()
    }
  })

  // Helper functions
  function navigateTo(path: string) {
    const url = `${window.location.origin}${path}`
    window.location.href = url
    options.onNavigate?.(url)
  }

  function getUsernameFromPage(): string | null {
    // Try to get username from the current URL or page
    const match = window.location.pathname.match(/^\/([^/]+)/)
    if (match && match[1] !== 'home' && match[1] !== 'explore' && match[1] !== 'i') {
      return match[1]
    }

    // Try to find it from the profile link in the sidebar
    const profileLink = document.querySelector('[data-testid="AppTabBar_Profile_Link"]')
    if (profileLink instanceof HTMLAnchorElement) {
      const href = profileLink.getAttribute('href')
      const usernameMatch = href?.match(/^\/([^/]+)/)
      if (usernameMatch) {
        return usernameMatch[1]
      }
    }

    return null
  }

  function getNavigableElements(): HTMLElement[] {
    // Get all tweets
    const tweets = Array.from(
      document.querySelectorAll('[data-testid="tweet"]'),
    ) as HTMLElement[]

    // Get all "Show posts" buttons
    const showPostsButtons: HTMLElement[] = []
    const cellDivs = document.querySelectorAll('[data-testid="cellInnerDiv"]')

    cellDivs.forEach((cell) => {
      const button = cell.querySelector('button')
      if (button) {
        const text = button.textContent || ''
        // Match "Show X posts" pattern
        if (/^Show \d+ posts?$/i.test(text.trim())) {
          showPostsButtons.push(cell as HTMLElement)
        }
      }
    })

    // Combine and sort by DOM position
    const allElements = [...tweets, ...showPostsButtons]
    allElements.sort((a, b) => {
      const position = a.compareDocumentPosition(b)
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
        return -1
      }
      else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        return 1
      }
      return 0
    })

    return allElements
  }

  function focusNextTweet() {
    const elements = getNavigableElements()
    if (elements.length === 0)
      return

    currentFocusedTweetIndex.value = Math.min(
      currentFocusedTweetIndex.value + 1,
      elements.length - 1,
    )

    focusTweet(elements[currentFocusedTweetIndex.value])
  }

  function focusPreviousTweet() {
    const elements = getNavigableElements()
    if (elements.length === 0)
      return

    currentFocusedTweetIndex.value = Math.max(currentFocusedTweetIndex.value - 1, 0)

    focusTweet(elements[currentFocusedTweetIndex.value])
  }

  function focusTweet(element: HTMLElement) {
    // Remove focus from all navigable elements
    const elements = getNavigableElements()
    elements.forEach((el) => {
      el.style.outline = ''
      el.style.outlineOffset = ''
      el.style.boxShadow = ''
    })

    // Add focus to the current element
    element.style.outline = '4px solid #1d9bf0'
    element.style.outlineOffset = '-4px'
    element.style.boxShadow = '0 0 0 2px rgba(29, 155, 240, 0.2)'
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function removeFocusFromTweet() {
    const elements = getNavigableElements()
    elements.forEach((el) => {
      el.style.outline = ''
      el.style.outlineOffset = ''
      el.style.boxShadow = ''
    })
    currentFocusedTweetIndex.value = 0
  }

  function clickOnFocusedTweet(selector: string) {
    const elements = getNavigableElements()
    const focusedElement = elements[currentFocusedTweetIndex.value]

    if (!focusedElement)
      return

    // Check if this is a "Show posts" button - these don't support tweet interactions
    const showPostsButton = focusedElement.querySelector('button')
    if (showPostsButton) {
      const text = showPostsButton.textContent || ''
      if (/^Show \d+ posts?$/i.test(text.trim())) {
        // "Show posts" buttons don't support reply/like/retweet actions
        return
      }
    }

    // Otherwise, treat it as a tweet
    const button = focusedElement.querySelector(selector) as HTMLElement
    if (button) {
      button.click()
      options.onInteraction?.(selector)
    }
  }

  function openFocusedTweet() {
    const elements = getNavigableElements()
    const focusedElement = elements[currentFocusedTweetIndex.value]

    if (!focusedElement)
      return

    // Check if this is a "Show posts" button
    const button = focusedElement.querySelector('button')
    if (button) {
      const text = button.textContent || ''
      if (/^Show \d+ posts?$/i.test(text.trim())) {
        // Click the "Show posts" button
        button.click()
        return
      }
    }

    // Otherwise, treat it as a tweet and open it
    const link = focusedElement.querySelector('a[href*="/status/"]') as HTMLAnchorElement
    if (link) {
      window.location.href = link.href
    }
  }

  // Track composition events (for IME input)
  document.addEventListener('compositionstart', () => {
    isComposing.value = true
  })

  document.addEventListener('compositionend', () => {
    isComposing.value = false
  })

  // Define all commands for the command palette
  const commands = [
    // Navigation commands
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Navigate to your home timeline',
      shortcut: 'g + h',
      category: 'navigation' as const,
      action: () => navigateTo('/home'),
    },
    {
      id: 'nav-explore',
      label: 'Go to Explore',
      description: 'Navigate to explore page',
      shortcut: 'g + e',
      category: 'navigation' as const,
      action: () => navigateTo('/explore'),
    },
    {
      id: 'nav-notifications',
      label: 'Go to Notifications',
      description: 'View your notifications',
      shortcut: 'g + n',
      category: 'navigation' as const,
      action: () => navigateTo('/notifications'),
    },
    {
      id: 'nav-messages',
      label: 'Go to Messages',
      description: 'Open your direct messages',
      shortcut: 'g + m',
      category: 'navigation' as const,
      action: () => navigateTo('/messages'),
    },
    {
      id: 'nav-grok',
      label: 'Go to Grok',
      description: 'Open Grok AI assistant',
      shortcut: 'g + k',
      category: 'navigation' as const,
      action: () => navigateTo('/i/grok'),
    },
    {
      id: 'nav-profile',
      label: 'Go to Profile',
      description: 'View your profile',
      shortcut: 'g + p',
      category: 'navigation' as const,
      action: () => {
        const username = getUsernameFromPage()
        if (username) {
          navigateTo(`/${username}`)
        }
      },
    },
    {
      id: 'nav-lists',
      label: 'Go to Lists',
      description: 'View your lists',
      shortcut: 'g + l',
      category: 'navigation' as const,
      action: () => {
        const username = getUsernameFromPage()
        if (username) {
          navigateTo(`/${username}/lists`)
        }
      },
    },
    {
      id: 'nav-bookmarks',
      label: 'Go to Bookmarks',
      description: 'View your bookmarked tweets',
      shortcut: 'g + b',
      category: 'navigation' as const,
      action: () => navigateTo('/i/bookmarks'),
    },
    {
      id: 'nav-communities',
      label: 'Go to Communities',
      description: 'View your communities',
      shortcut: 'g + c',
      category: 'navigation' as const,
      action: () => {
        const username = getUsernameFromPage()
        if (username) {
          navigateTo(`/${username}/communities`)
        }
      },
    },
    // Tweet interaction commands
    {
      id: 'tweet-next',
      label: 'Focus Next Tweet',
      description: 'Move focus to the next tweet',
      shortcut: 'j',
      category: 'tweet' as const,
      action: () => focusNextTweet(),
    },
    {
      id: 'tweet-previous',
      label: 'Focus Previous Tweet',
      description: 'Move focus to the previous tweet',
      shortcut: 'k',
      category: 'tweet' as const,
      action: () => focusPreviousTweet(),
    },
    {
      id: 'tweet-reply',
      label: 'Reply to Tweet',
      description: 'Reply to the focused tweet',
      shortcut: 'r',
      category: 'tweet' as const,
      action: () => clickOnFocusedTweet('[data-testid="reply"]'),
    },
    {
      id: 'tweet-retweet',
      label: 'Retweet',
      description: 'Retweet the focused tweet',
      shortcut: 't',
      category: 'tweet' as const,
      action: () => clickOnFocusedTweet('[data-testid="retweet"]'),
    },
    {
      id: 'tweet-like',
      label: 'Like Tweet',
      description: 'Like the focused tweet',
      shortcut: 'l',
      category: 'tweet' as const,
      action: () => clickOnFocusedTweet('[data-testid="like"]'),
    },
    {
      id: 'tweet-bookmark',
      label: 'Bookmark Tweet',
      description: 'Bookmark the focused tweet',
      shortcut: 'b',
      category: 'tweet' as const,
      action: () => clickOnFocusedTweet('[data-testid="bookmark"]'),
    },
    {
      id: 'tweet-open',
      label: 'Open Tweet',
      description: 'Open the focused tweet in detail view',
      shortcut: 'o',
      category: 'tweet' as const,
      action: () => openFocusedTweet(),
    },
    {
      id: 'tweet-unfocus',
      label: 'Remove Focus',
      description: 'Remove focus from the current tweet',
      shortcut: 'Esc',
      category: 'tweet' as const,
      action: () => removeFocusFromTweet(),
    },
  ]

  return {
    currentFocusedTweetIndex,
    focusNextTweet,
    focusPreviousTweet,
    removeFocusFromTweet,
    commands,
    navigateTo,
    getUsernameFromPage,
  }
}
