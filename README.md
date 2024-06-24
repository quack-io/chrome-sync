## chrome-sync Documentation

### Overview and Purpose

The primary purpose of the `chrome-sync` project is to sync states across all scopes of Chrome extensions, facilitating easy alignment of states. It is an essential tool for every Chrome extension builder, simplifying the management of state between different extension components such as service workers, content scripts, popups, and side panels.

### Installation

#### Prerequisites

No prerequisites or dependencies are required other than this library.

#### Installation Steps

To install the `chrome-sync` library, simply run the following command:

```bash
npm i @chrome-sync/react
```

### Usage

#### Main Features and Functionalities

Managing state between Chrome extension scopes is challenging. The `chrome-sync` library simplifies this process by providing a streamlined way to synchronize state across different components of a Chrome extension, including service workers, content scripts, popups, and side panels.

#### Example Usage

Here is an example of how to use `chrome-sync` in a React application:

```jsx
import React from "react";
import { useChromeSync } from "@chrome-sync/react";

const App: React.FC<{}> = () => {
  const [counter, setCounter] = useChromeSync("counter");

  return (
    <div style={{ width: "350px" }} className="popup-container">
      counter: {counter}
      <br />
      <div>
        <button onClick={() => setCounter(counter - 1)}>-</button>
        <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
    </div>
  );
};

export default App;
```

#### Configuration Options

There are no specific configuration options or settings that users need to be aware of.

### Contributing

#### Guidelines

- Follow best practices in coding and documentation.
- Ensure that your code is well-tested and maintainable.

#### Submitting Bug Reports and Feature Requests

- Submit bug reports and feature requests by opening issues on the repository's GitHub page.

### Support and Community

#### Seeking Help or Support

- If you encounter any issues, please open an issue on the repository's GitHub page.

#### Community Forums and Channels

- Currently, there are no community forums or channels for discussion and collaboration. These may be introduced later.

### License

- The `chrome-sync` project is free for everyone to use.

### Special Considerations

- There are no special considerations or restrictions for using this library.

---

Feel free to reach out by opening an issue if you have any questions or need further assistance. Happy coding!
