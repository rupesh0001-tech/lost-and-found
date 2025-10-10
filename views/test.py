class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)

    def pop(self):
        return self.items.pop() if self.items else None

    def is_empty(self):
        return len(self.items) == 0


def clean_string(s):
    """Convert to lowercase and remove non-alphanumeric characters"""
    return ''.join(ch.lower() for ch in s if ch.isalnum())


def is_palindrome(s):
    s_clean = clean_string(s)
    stack = Stack()

    # Push all characters
    for ch in s_clean:
        stack.push(ch)

    # Pop to form reversed string
    reversed_str = ''
    while not stack.is_empty():
        reversed_str += stack.pop()

    return s_clean == reversed_str


if __name__ == "__main__":
    text = input("Enter a string: ")
    if is_palindrome(text):
        print(f"✅ '{text}' is a Palindrome!")
    else:
        print(f"❌ '{text}' is NOT a Palindrome.")
