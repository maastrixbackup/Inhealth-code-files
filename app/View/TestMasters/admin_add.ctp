
<!-- Main content -->
<section class="content">
<div class="row">
    <!-- left column -->
    <div class="col-md-8">
        <!-- general form elements -->
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title">Add New Test</h3>
            </div><!-- /.box-header -->
            <!-- form start -->
           <?php echo $this->Form->create('TestMaster');?>
                <div class="box-body">
                   <?php echo $this->Form->input('test_name',array('label'=>'Name','type'=>'text', 'class' => 'form-control', 'div' => 'form-group'));?>
                  <?php echo $this->Form->input('parent_id',array('label' => 'Select Parent', 'default'=>0, 'class' => 'form-control', 'div' => 'form-group', 'options' => $testparentList));?>
                <?php echo $this->Form->input('status',array('label'=>'Status','type'=>'select', 'options' => array(1=> 'Active', 0 => 'Inactive'), 'class' => 'form-control', 'div' => 'form-group'));?>
                </div><!-- /.box-body -->

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div><!-- /.box -->


    </div><!--/.col (left) -->
    <!-- right column -->
    <div class="col-md-6">
        <!-- general form elements disabled -->
        <!-- /.box -->
    </div><!--/.col (right) -->
</div>   <!-- /.row -->
</section><!-- /.content -->



