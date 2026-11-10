Events in JavaScript - Lab Files

starter/    Give these to students. Each exercise folder has index.html,
            styles.css, and app.js. Students write their code in app.js
            (and add CSS classes where the lab says to).

solutions/  Instructor copies. Open each index.html in a browser to see
            the finished behavior.

Every page links its script with <script src="app.js" defer>, so
students can open index.html directly. No server is required.

instructor-tools/check_lab.js
            Optional automated behavior checks. Run "npm install jsdom"
            once, then "node check_lab.js <folder>" where <folder> holds a
            student's six exercise folders. With no folder, it checks the
            solutions. See the comments at the top of the file.
