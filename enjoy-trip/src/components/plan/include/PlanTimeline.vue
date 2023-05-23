<template>
  <div class="timelinespace">
    <Timeline
      :timeline-items="timelineItems"
      :message-when-no-items="messageWhenNoItems"
      :unique-year="true"
      :show-day-and-month="true"
      order="desc"
    />
  </div>
</template>

<script>
import Timeline from "timeline-vuejs";

export default {
  props: ["places"],
  data: function () {
    return {
      messageWhenNoItems: "There arent items",
      timelineItems: [
        {
          from: new Date(2017, 5, 22),
          title: "Name",
          showDayAndMonth: true,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.",
        },
        {
          from: new Date(2017, 8),
          title: "Name",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.",
        },
        {
          from: new Date(2016, 11),
          title: "Name",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.",
        },
      ],
    };
  },
  components: {
    Timeline,
  },
  created() {
    console.log("places: ", this.places);
    let timeline = ``;
    for (let i = 0; i < this.places.length; i++) {
      if (i % 2 == 0) {
        timeline += `<div class="container left">
                        <div class="content">
                            <h2>${this.places[i].title}</h2>
                        </div>
                    </div>\n`;
      } else {
        timeline += `<div class="container right">
                        <div class="content">
                            <h23>${this.places[i].content}</h23>
                        </div>
                    </div>`;
      }
    }
    console.log(timeline);
    // document.getElementById("timeline").innerHTML = timeline;
  },
};
</script>

<style></style>
