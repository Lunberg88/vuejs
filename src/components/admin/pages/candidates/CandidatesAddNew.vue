<template>
    <div>
        <section>
            <h3>{{ title }}</h3>
        </section>
        <div class="col-md-10">
            <form>
                <div class="form-group row">
                    <label for="fio" class="col-sm-4 col-form-label">Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="fio" placeholder="Name...">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="email" placeholder="Email...">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="stack" class="col-sm-4 col-form-label">Stack</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="stack" placeholder="Stack...">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="tags" class="col-sm-4 col-form-label">Skills</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="tags" placeholder="Skills...">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="salary" class="col-sm-4 col-form-label">Salary</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="salary" placeholder="Salary...">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="currency" class="col-sm-4 col-form-label">Currency</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="currency" placeholder="Currency...">
                    </div>
                </div>
                <hr />
                <div class="form-group row">
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-success float-right btn-sm">Add candidate</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CandidateAddNew',
    data() {
        return {
            title: 'Add new Candidate'
        }
    }
}
</script>