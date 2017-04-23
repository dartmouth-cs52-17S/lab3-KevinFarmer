# Lab 3

I completed the assignment as described here: http://cs52.me/assignments/lab/react-notes/

My React app contains two types of components, a new_note_input which there is a single instance of, and a note component which there can be any number of. Almost all of the state for the site is kept in the top level App, the exception being that the new note input field hold what is currently being typed until "Create Note" or the Enter key is pressed, at which point the contents of the local state are passed up to the parent App.

### Extra Credit

Z-index sorting: I initially had it so that when you start to drag a not it would bring it to the front, but found that to be awkward to use and changed to to be that when you click anywhere within a note that it brings it to the front.

Live editing: Since I don't have any auth then I can't display which user is currently editing a particular note, but when anyone is editing a particular note that note will appear in the editing state for everyone and changes being made are shown in realtime.

I also attempted to include resizable notes as well, but the package that I was using was having some odd interoperability with react-draggable, and I didn't have time to sort it all out.
