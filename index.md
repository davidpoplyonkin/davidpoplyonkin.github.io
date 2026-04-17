---
title: ""
layout: single
hide_title: true
---
## Introduction
I am a Computer Science graduate and software developer dedicated to mastering the full application lifecycle. My expertise lies at the intersection of scalable microservices and secure system design. I am particularly fascinated by the orchestration of RESTful APIs within decoupled architectures, and I maintain a security-first mindset by proactively addressing the expanded attack surfaces inherent in distributed systems through robust authentication and encryption protocols.

Beyond functional development, I prioritize performance. By leveraging Big $O$ analysis to optimize data access layers and database indexing, I ensure applications remain performant under load. This foundation is central to my long-term goal: bridging full-stack development with AI Engineering. I am focused on building the asynchronous, high-concurrency environments necessary to deploy RAG pipelines and agentic AI at scale, ensuring that today’s robust architectures become the hosting platforms for tomorrow’s intelligent systems.

To demonstrate my professional growth, I have selected two previous projects to refactor, aligning them with my current mastery of software engineering patterns, database optimization, and algorithmic efficiency. The first artifact is a Python Telegram bot integrated with [PostgreSQL](#glossary-postgresql) and [Matplotlib](#glossary-matplotlib) for health data visualization. The second is a [Django](#glossary-django) web application designed for CRUD-based document templating and PDF generation. By revisiting these projects, I aim to showcase the evolution of my technical standards, transforming functional prototypes into production-ready systems.

## Code Review
{% include video id="Fr_32oAb1eQ" provider="youtube" %}

## Software Engineering
The Telegram bot is a good candidate for a software engineering enhancement because it represents a transition from monolithic design to a microservices-based architecture, marking a significant milestone in my development capabilities. By configuring an [Nginx](#glossary-nginx) [reverse proxy](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/nginx/conf/nginx.conf) and managing [CORS policies](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/api/app/main.py#L19-L23), I demonstrated the ability to facilitate seamless communication between decoupled services. I also moved beyond standard login workflow by using Telegram InitData for authentication, which highlights my ability to integrate platform-specific security practices. To ensure the system remains performant despite the increased number of I/O operations, I leveraged asynchronous programming, showcasing my focus on efficiency. The integration of responsive CSS for mobile interfaces ensures that complex back-end logic is paired with a functional UI.

The primary improvement lies in a more intuitive chart generation, with the [static image generation](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-original/bot/charts.py) being replaced with an interactive [dashboard](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/dashboard/src/Chart.tsx). To support this shift, I performed an architectural refactor, transitioning the system to a microservices model. This modular approach significantly improves the system's extensibility, allowing for the seamless integration of additional Telegram Mini App interfaces and third-party APIs.

Thanks to a lower technical barrier, the new dashboard can cater to a wider audience, thus promoting collaboration in organizational decision making. Regarding the security best practices, I implemented a multi-layered authentication and authorization strategy. It begins with reliable authentication via Telegram InitData, which is then exchanged for a short-lived [JWT](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/api/app/routers/auth.py) to handle frequent session validation efficiently. In transit, the data is encrypted via HTTPS. On the client side, I leveraged [Telegram Secure Storage](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/dashboard/src/helpers/api.ts#L17) to protect the tokens from standard browser storage vulnerabilities. Finally, I utilized [FastAPI](#glossary-fastapi)’s chained dependency injections to create customizable access patterns.

While working on this artifact, I navigated several technical challenges that required deep, independent research. Moving beyond the batteries-included frameworks like `Django`, I learned to manually implement authentication protocols, which gave me a deeper insight into the inner workings of secure handshakes. The shift from dynamic Python to the strict typing of TypeScript and Pydantic was initially a hurdle, but it taught me to write more predictable and self-documenting code that fires errors early, making it easier to debug type mismatches. Furthermore, when the native modification options for [ApexCharts](#glossary-apexcharts) were insufficient, I used browser developer tools to inspect the DOM and override behaviors with [custom CSS](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/dashboard/src/index.css#L27-L41). This experience improved my ability to adjust third-party tools for the project needs.

## Database
Another modification in the Telegram bot involves migrating from [raw SQL](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-original/bot/apps/core/models.py) to a dedicated [data access API](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/tree/main/src/tg-bot-enhanced/api). This shift directly implements the DRY principle by isolating retrieval logic into a single source of truth for both the Telegram bot and the React dashboard. To support both server-to-server and client-to-server access patterns, I leveraged `FastAPI`’s [dependency injection](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/api/app/deps/auth.py) system to build a modular security layer. By abstracting access control into the API rather than relying on complex `PostgreSQL` roles, I maintained a strict Separation of Concerns, treating the database as a pure storage layer while centralizing business logic in the application code.

This artifact was significantly improved through the integration of [Alembic](#glossary-alembic) for [database versioning](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/tree/main/src/tg-bot-enhanced/api/app/migrations/versions). Previously, schema updates were handled through manual SQL execution, a process prone to human error. However, a migration system, such as `Alembic`, automates this process, ensuring consistency across development and production environments. Furthermore, I replaced the bot’s in-memory storage with a [Redis](#glossary-redis) instance. By offloading user sessions and state transitions to an [external cache](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/docker-compose.yml#L38-L47), I eliminated the risk of data loss during service restarts and paved the way for horizontal scaling. Having become stateless, the bot can now be deployed in multiple concurrent instances, significantly increasing the system's throughput.

The refactored data access layer is inherently self-documenting. `FastAPI`’s auto-generated Swagger UI provides a standardized interface for API exploration, while [SQLAlchemy](#glossary-sqlalchemy) models and `Alembic` migrations serve as a chronological record of the database’s evolution. Furthermore, the implementation of [asynchronous database operations](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/api/app/crud/user.py) demonstrates the application of modern computing practices to deliver measurable business value. By utilizing `SQLAlchemy` with [asyncpg](#glossary-asyncpg), I established a non-blocking I/O architecture that ensures the bot remains responsive even under heavy concurrent load.

Reflecting on the enhancement process, the primary challenge was not the individual code changes, but the orchestration and deployment. While transitioning from a managed serverless environment (Vercel) to a self-managed VPS, the most substantial hurdle was resolving port contention on the host machine. Since my VPS already hosts multiple projects, deploying a new application risked conflicting over ports 80 and 443. To solve this without creating a single bloated `Nginx` configuration, I implemented a nested reverse-proxy pattern using Docker Compose. In the process, I learned to distribute networking responsibilities between a Master `Nginx` entry point, which handles [dynamic subdomain routing](https://github.com/davidpoplyonkin/nested-proxy/blob/main/master-nginx/nginx/conf/nginx.conf#L33), and app-specific `Nginx` [instances](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/tg-bot-enhanced/docker-compose.yml#L36) that manage internal load balancing and serving static files. This experience taught me how to maximize a single server’s utility while maintaining isolated, maintainable configurations.

## Algorithms and Data Structures
The `Django` web was migrated from a server-only architecture to a more efficient full-stack approach. By moving the [autocomplete logic](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-original/django_app/apps/core/templates/core/partials/autocomplete.html) from the backend (`Django` + [HTMX](#glossary-htmx)) to a React client-side component, I shifted the load to the client, effectively eliminating redundant network latency.
This enhancement showcases my proficiency in algorithms and data structures through the implementation of a Trie. While the original system relied on [server-side queries](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-original/django_app/apps/core/views.py#L53) - which involved $O(\log N)$ string matching even when indexed - the new version achieves $O(\text{prefix length})$ retrieval time. To navigate the Trie, I implemented a Depth-First Search. However, rather than using a standard recursive approach, I utilized a generator-like function to enable [gradual retrieval](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-enhanced/react-app/src/types/Trie.ts#L77) of results and preserve the keyboard-only CLI style of the original autocomplete.

In the original `HTMX` implementation, every arrow key press triggered a [round-trip network request](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-original/django_app/apps/core/templates/core/partials/autocomplete.html#L11-L16) to the `Django` backend, whereas in the React component, the network overhead is reduced to a single [initial fetch](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-enhanced/react-app/src/App.tsx#L14). While this involved loading the whole suggestion dataset at once, it resulted in a more responsive user experience. Furthermore, by moving the filtering logic to the client side, I significantly reduced the database load, allowing the server to handle a higher volume of concurrent users.

This enhancement involves designing and evaluating computing solutions with the use of algorithmic principles. By storing the whole suggestions dataset in a Trie data structure on the client side, I resolve the performance bottleneck created by frequent requests to the server. Regarding the larger initial data payload, I accept it to reduce latency during user interaction. Finally, I adapt standard DFS according to the user needs, implementing a non-recursive version of it to achieve statefulness.

In this project, I learned how to adapt standard data structures and algorithms to the project needs. Specifically, the custom DFS often required moving to the left/right sibling or to the first/last child. However, these functionalities are not natively supported by JavaScript Map objects, typically used to store child nodes. Furthermore, a direct transition between siblings doesn’t capture the character that the target sibling represents. To overcome this, I equipped the nodes with the parent reference and the keys (characters) of the adjacent siblings and the outer children. Now, to [get to a sibling](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-enhanced/react-app/src/types/Trie.ts#L85-L93), the node moves one level up and retrieves the sibling from the parent’s Map using the stored key. Initially, this required a double check: whether the key is null and whether it corresponds to a value in the Map. However, representing missing siblings with an [empty string](https://github.com/davidpoplyonkin/davidpoplyonkin.github.io/blob/main/src/django-app-enhanced/react-app/src/types/Trie.ts#L4-L7) key allows consolidating these checks.

## Glossary
<a id="glossary-aiogram"></a>
**`aiogram`:** An asynchronous framework for the Telegram Bot API, built on `asyncio` and `aiohttp` to handle high-concurrency interactions.

<a id="glossary-alembic"></a>
**`Alembic`:** A lightweight database migration tool designed for use with `SQLAlchemy`. It automates the application of schema changes via CLI, ensuring database version control.

<a id="glossary-apexcharts"></a>
**`ApexCharts`:** A modern JavaScript charting library designed for creating responsive data visualizations.

<a id="glossary-asyncpg"></a>
**`asyncpg`:** A high-performance, asynchronous database interface specifically designed for Python and `PostgreSQL`.

<a id="glossary-django"></a>
**`Django`:** A high-level Python web framework that includes built-in features like an ORM and session management. While primarily optimized for server-side rendering, it can be extended with frontend libraries for dynamic UI.

<a id="glossary-fastapi"></a>
**`FastAPI`:** A high-performance, minimalist web framework for building APIs with Python, featuring native support for asynchronous programming and data validation.

<a id="glossary-htmx"></a>
**`HTMX`:** A library that allows access to AJAX, CSS Transitions, and WebSockets directly in HTML using attributes, reducing the need for custom JavaScript.

<a id="glossary-matplotlib"></a>
**`Matplotlib`:** A comprehensive library for creating static, animated, and interactive (requires an engine, such as a Jupyter Notebook) visualizations in Python.

<a id="glossary-nginx"></a>
**`Nginx`:** A high-performance HTTP server. In this project, it is utilized both as a reverse proxy for microservice routing and as a web server for hosting dashboard assets.

<a id="glossary-postgresql"></a>
**`PostgreSQL`:** A powerful, open-source object-relational database system.

<a id="glossary-redis"></a>
**`Redis`:** An in-memory, NoSQL data structure store used as a database or a cache.

<a id="glossary-sqlalchemy"></a>
**`SQLAlchemy`:** A SQL toolkit and Object-Relational Mapper that facilitates the mapping of database tables to Python objects.

## Outcomes Checklist
- [x] Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science. [View Narrative](#software-engineering)
- [x] Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts. [View Narrative](#database)
- [x] Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices. [View Narrative](#algorithms-and-data-structures)
- [x] Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals. [View Narrative](#database)
- [x] Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources. [View Narrative](#software-engineering)
