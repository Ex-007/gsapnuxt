<template>
    <div class="overAll">
        <div class="container">
            <div ref="box" class="box">K</div>
        </div>
        <div class="container">
            <div ref="boxTwo" class="box2">K</div>
        </div>
        <div class="container">
            <div ref="boxThree" class="box3">K</div>
        </div>
    </div>
</template>

<script setup>
    import gsap from 'gsap'
    // const box = ref(null)
    const box = ref(null)
    const boxTwo = ref(null)
    const boxThree = ref(null)

    const movement = () => {
        gsap.to(box.value, {
            x: 200,
            duration: 2,
            repeat: -1,
            yoyo: true,
            scale: 2,
        })
    }

    const movementTwo = () => {
        gsap.to(boxTwo.value, {
            x: 300,
            duration: 2,
            repeat: -1,
            yoyo: true,
            scale: 2,

        })
    }
    const movementThree = () => {
        gsap.to(boxThree.value, {
            x: 400,
            duration: 2,
            repeat: -1,
            yoyo: true,
            scale: 2,
        })
    }

    onMounted(() => {
        movement()
        movementTwo()
        movementThree()
    })
</script>

<style scoped>
    .box{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(255, 0, 0);
        border: 2px solid white;
        outline: 2px solid rgb(255, 0, 0);
    }
    .box2{
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 0, 0);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
        border: 2px solid rgb(255, 0, 0);
        outline: 2px solid rgb(255, 255, 255);
    }
    .box3{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(233, 10, 10);
        border: 2px solid white;
        outline: 2px solid red;
    }
    .overAll{
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        /* gap: 5px; */
    }
</style>