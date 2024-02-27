export default {
  name: "Post",
  props: ["post", "index"],
  methods: {
    editpost: function (index) {
      this.$emit("editpost", index);
    },
    deletepopup: function (index) {
      this.$emit("deletepopup", index);
    },
  },
  template: `
    <li>
        <h1>Title: {{ post.title }}</h1>
        <h2>Author {{ post.author }}</h2>
        <p>Description: {{ post.description }}</p>
        <button class="btn" v-on:click="editpost(index)">Edit</button>
        <button class="btn" v-on:click="deletepopup(index)">Delete</button>
    </li>
    `,
};
